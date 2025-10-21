import React, { useEffect, useMemo, useState } from 'react';
import SiteLayout from '../components/SiteLayout.jsx';
import CreateRiderModal from '../components/CreateRiderModal.jsx';
import EditRiderModal from '../components/EditRiderModal.jsx';
import { DEFAULT_FARE_SETTINGS, FARE_SETTINGS_STORAGE_KEY, readFareSettings } from '../utils/fareSettings.js';
import { writeRiderPerformance } from '../utils/riderPerformanceStorage.js';

function toDate(value){
  if (!value) return null;
  if (value instanceof Date){
    return Number.isFinite(value.getTime()) ? value : null;
  }
  if (typeof value === 'string'){
    const t = Date.parse(value);
    return Number.isFinite(t) ? new Date(t) : null;
  }
  if (typeof value === 'number'){
    const d = new Date(value);
    return Number.isFinite(d.getTime()) ? d : null;
  }
  if (typeof value === 'object'){
    if (typeof value.toDate === 'function'){
      try{
        const d = value.toDate();
        if (d instanceof Date && Number.isFinite(d.getTime())) return d;
      }catch(_){ }
    }
    if (typeof value.seconds === 'number'){
      const ms = (value.seconds * 1000) + (typeof value.nanoseconds === 'number' ? Math.floor(value.nanoseconds / 1e6) : 0);
      const d = new Date(ms);
      if (Number.isFinite(d.getTime())) return d;
    }
  }
  return null;
}

function monthKeyFromDate(date){
  if (!(date instanceof Date) || !Number.isFinite(date.getTime())) return '';
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

const ORDER_DATE_FIELDS = [
  'completedAt','completed_at','deliveredAt','delivered_at','createdAt','created_at','created','assignedAt','assigned_at','timestamp','orderedAt','ordered_at','updatedAt','updated_at'
];

function extractOrderMonthKey(order){
  if (!order || typeof order !== 'object') return '';
  for (const field of ORDER_DATE_FIELDS){
    const value = order[field];
    const date = toDate(value);
    if (date) return monthKeyFromDate(date);
  }
  return '';
}

function countOrdersForMonth(orders, monthKey){
  if (!Array.isArray(orders) || !monthKey) return 0;
  let count = 0;
  for (const order of orders){
    const key = extractOrderMonthKey(order);
    if (key === monthKey) count += 1;
  }
  return count;
}


export default function Riders(){
  const getDefaultDateRange = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const from = `${firstDay.getFullYear()}-${String(firstDay.getMonth() + 1).padStart(2, '0')}-${String(firstDay.getDate()).padStart(2, '0')}`;
    const to = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    return { from, to };
  };

  const defaultDates = useMemo(()=> getDefaultDateRange(), []);
  const [riders, setRiders] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 20, pages: 1 });
  const [showCreateRider, setShowCreateRider] = useState(false);
  const [editingRider, setEditingRider] = useState(null);
  const [fareSettings, setFareSettings] = useState(DEFAULT_FARE_SETTINGS);
  const [dateRangeFrom, setDateRangeFrom] = useState(defaultDates.from);
  const [dateRangeTo, setDateRangeTo] = useState(defaultDates.to);
  const [riderRangeData, setRiderRangeData] = useState(new Map());

  useEffect(()=>{
    function syncFareSettings(){
      setFareSettings(readFareSettings());
    }
    syncFareSettings();
    function handleStorage(event){
      if(event.key === FARE_SETTINGS_STORAGE_KEY){
        syncFareSettings();
      }
    }
    if(typeof window !== 'undefined'){
      window.addEventListener('storage', handleStorage);
      window.addEventListener('fare-settings-changed', syncFareSettings);
    }
    return ()=>{
      if(typeof window !== 'undefined'){
        window.removeEventListener('storage', handleStorage);
        window.removeEventListener('fare-settings-changed', syncFareSettings);
      }
    };
  },[]);

  useEffect(()=>{
    let alive = true;
    (async ()=>{
      setLoading(true); setError('');
      try{
        const params = new URLSearchParams();
        if(q) params.set('q', q);
        params.set('page', String(page));
        params.set('limit', String(limit));
        const res = await fetch(`/api/riders?${params.toString()}`, { credentials:'include' });
        if(res.status === 401){ window.location.href = '/auth/login'; return; }
        if(!res.ok) throw new Error('Failed to load riders');
        const data = await res.json();
        if(alive){
          setRiders(Array.isArray(data.riders)?data.riders:[]);
          setMeta({ total: data.meta?.total||0, page: data.meta?.page||1, limit: data.meta?.limit||limit, pages: data.meta?.pages||1 });
        }
      }catch(e){ if(alive){ setError(e.message||'Failed to load riders'); } }
      finally{ if(alive) setLoading(false); }
    })();
    return ()=>{ alive = false; };
  },[q,page,limit]);

  useEffect(()=>{
    if (!dateRangeFrom || !dateRangeTo || !riders.length) { setRiderRangeData(new Map()); return; }

    const controller = new AbortController();
    const signal = controller.signal;
    let cancelled = false;

    const limit = (() => {
      const hc = (typeof navigator !== 'undefined' && Number.isFinite(Number(navigator.hardwareConcurrency))) ? Number(navigator.hardwareConcurrency) : 8;
      return Math.max(2, Math.min(8, Math.floor(hc / 2)));
    })();

    setRiderRangeData(new Map());

    const tasks = riders.map(rider => async () => {
      const cacheKey = `${rider.id}:${dateRangeFrom}:${dateRangeTo}`;
      try{
        const res = await fetch(`/api/riders/${rider.id}/km-in-range?fromDate=${dateRangeFrom}&toDate=${dateRangeTo}`, { credentials:'include', signal });
        if (res.status === 401) { window.location.href = '/auth/login'; return; }
        if (!res.ok) {
          const errText = await res.text().catch(()=>String(res.status));
          console.error(`km-in-range error for ${rider.id}:`, res.status, errText);
          return;
        }
        const data = await res.json();
        if (cancelled || signal.aborted) return;
        setRiderRangeData(prev => {
          const next = new Map(prev);
          next.set(cacheKey, {
            km: data.totalKm || 0,
            rideCount: data.rideCount || 0,
            performancePct: data.performancePct || 0
          });
          return next;
        });
      }catch(e){
        if (e && e.name === 'AbortError') return;
        console.error(`km-in-range fetch error for ${rider.id}:`, e);
      }
    });

    async function runPool(list, concurrency){
      let idx = 0;
      const workers = new Array(Math.min(concurrency, list.length)).fill(0).map(async ()=>{
        while(!cancelled && !signal.aborted){
          const current = idx++;
          if (current >= list.length) break;
          await list[current]();
        }
      });
      await Promise.all(workers);
    }

    runPool(tasks, limit);

    return () => {
      cancelled = true;
      controller.abort();
    };
  },[dateRangeFrom, dateRangeTo, riders]);

  const filtered = useMemo(()=>{
    return riders.filter(r=>{
      if(q && !String(r.name||'').toLowerCase().includes(q.toLowerCase().trim())) return false;

      if(dateRangeFrom || dateRangeTo){
        const lastActiveDays = Number(r.lastActiveDays ?? 0);
        const fromDate = dateRangeFrom ? new Date(dateRangeFrom) : null;
        const toDate = dateRangeTo ? new Date(dateRangeTo) : null;

        if(fromDate && toDate){
          const daysAgo = Math.floor((Date.now() - fromDate.getTime()) / (1000 * 60 * 60 * 24));
          const daysFrom = Math.floor((Date.now() - toDate.getTime()) / (1000 * 60 * 60 * 24));
          if(lastActiveDays < daysFrom || lastActiveDays > daysAgo) return false;
        } else if(fromDate){
          const daysAgo = Math.floor((Date.now() - fromDate.getTime()) / (1000 * 60 * 60 * 24));
          if(lastActiveDays > daysAgo) return false;
        } else if(toDate){
          const daysFrom = Math.floor((Date.now() - toDate.getTime()) / (1000 * 60 * 60 * 24));
          if(lastActiveDays < daysFrom) return false;
        }
      }
      return true;
    });
  },[riders,q,dateRangeFrom,dateRangeTo]);

  const farePerKm = useMemo(()=>{
    const rate = Number(fareSettings.farePerKm);
    return Number.isFinite(rate) ? rate : DEFAULT_FARE_SETTINGS.farePerKm;
  },[fareSettings]);

  const baseFare = useMemo(()=>{
    const value = Number(fareSettings.baseFare);
    return Number.isFinite(value) ? value : DEFAULT_FARE_SETTINGS.baseFare;
  },[fareSettings]);

  useEffect(()=>{
    if(!Array.isArray(riders) || riders.length === 0) return;
    const entries = {};
    for (const rider of riders){
      if(!rider || rider.id === undefined || rider.id === null) continue;
      const performance = Number(rider.performancePct);
      if(!Number.isFinite(performance)) continue;
      entries[rider.id] = Math.round(performance);
    }
    if(Object.keys(entries).length === 0) return;
    writeRiderPerformance(entries);
  },[riders]);

  // compute last three months keys and labels (YYYY-MM)
  const lastThreeMonths = useMemo(()=>{
    const now = new Date();
    const keys = [];
    const labels = [];
    for(let i=2;i>=0;i--){
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
      const label = d.toLocaleString(undefined, { month: 'short', year: 'numeric' });
      keys.push(key);
      labels.push(label);
    }
    return { keys, labels };
  },[]);

  return (
    <SiteLayout>
      <section className="rider-management">
        <header className="rc-header riders-header">
          <div className="riders-header-left">
            <h2 className="rc-title">Rider Management</h2>
            <p className="rc-subtitle">View and manage riders based on performance.</p>
          </div>
          <div className="riders-header-right">
            <button className="btn-secondary btn-create-rider" onClick={()=>setShowCreateRider(true)}>Create Rider</button>
          </div>
        </header>

        <div className="rc-toolbar">
          <div className="rc-search">
            <span className="rc-search-icon" aria-hidden="true"></span>
            <input className="rc-search-input" type="search" placeholder="Search" value={q} onChange={e=>{ setQ(e.target.value); setPage(1); }} />
          </div>
          <div className="rc-filters">
            <div className="date-range-filter">
              <input type="date" className="date-range-input" value={dateRangeFrom} onChange={e=>{ setDateRangeFrom(e.target.value); setPage(1); }} placeholder="From" title="Filter from date" />
              <span className="date-range-separator">to</span>
              <input type="date" className="date-range-input" value={dateRangeTo} onChange={e=>{ setDateRangeTo(e.target.value); setPage(1); }} placeholder="To" title="Filter to date" />
            </div>
          </div>
        </div>

        <div className="rc-table-wrapper">
          {showCreateRider && (
            <CreateRiderModal onClose={()=>setShowCreateRider(false)} onCreated={()=>{ window.location.reload(); }} />
          )}
          {editingRider && (
            <EditRiderModal
              rider={editingRider}
              onClose={()=> setEditingRider(null)}
              onUpdated={(serverRider)=>{
                if (!serverRider){ setEditingRider(null); return; }
                setRiders(prev => prev.map(x => String(x.id) === String(serverRider.id) ? { ...x, name: serverRider.displayName || serverRider.name || x.name, contactNumber: serverRider.contactNumber ?? x.contactNumber } : x));
                setEditingRider(null);
              }}
            />
          )}
          <table className="rc-table">
            <thead>
              <tr>
                <th className="col-name">Rider Name</th>
                <th key={lastThreeMonths.keys[lastThreeMonths.keys.length - 1]} className="col-month">Range</th>
                <th className="col-earnings">{(() => { const k = lastThreeMonths.keys[lastThreeMonths.keys.length - 2]; const parts = String(k).split('-'); const y = parseInt(parts[0],10); const m = parseInt(parts[1],10); const d = new Date(Number.isFinite(y)?y:new Date().getFullYear(), Number.isFinite(m)?(m-1):new Date().getMonth()-1, 1); const ml = d.toLocaleString(undefined, { month: 'short' }); return `Earnings (${ml}, Rs)`; })()}</th>
                <th className="col-perf">Performance</th>
                <th className="col-total">Total</th>
                <th className="col-action">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={7} className="section-note">Loading…</td></tr>
              )}
              {!loading && error && (
                <tr><td colSpan={7} className="auth-error">{error}</td></tr>
              )}
              {!loading && !error && filtered.map(r => (
                <tr key={r.id} data-rider-id={r.id} data-status={r.status} data-last-days={r.lastActiveDays}>
                  <td className="rc-col-name"><a className="rider-name-link" href={`/riders/${r.id}`}>{r.name}</a></td>
                  <td className="rc-col-month">{(() => {
                    if (dateRangeFrom && dateRangeTo) {
                      const cacheKey = `${r.id}:${dateRangeFrom}:${dateRangeTo}`;
                      const data = riderRangeData.get(cacheKey);
                      const km = data?.km ?? 0;
                      return `${Number(km).toFixed(2)} km`;
                    }
                    return `${Number(r.monthlyCounts?.[lastThreeMonths.keys[lastThreeMonths.keys.length - 1]] || 0).toFixed(2)} km`;
                  })()}</td>
                  {(() => {
                    let km = 0;
                    let rideCount = 0;

                    if (dateRangeFrom && dateRangeTo) {
                      const cacheKey = `${r.id}:${dateRangeFrom}:${dateRangeTo}`;
                      const data = riderRangeData.get(cacheKey);
                      km = data?.km ?? 0;
                      rideCount = data?.rideCount ?? 0;
                    } else {
                      const lastMonthKey = lastThreeMonths.keys[lastThreeMonths.keys.length - 2];
                      km = Number(r.monthlyCounts?.[lastMonthKey] || 0);
                      const orders = Array.isArray(r.orders) ? r.orders : [];
                      rideCount = Number(r.monthlyRideCounts?.[lastMonthKey] ?? countOrdersForMonth(orders, lastMonthKey) ?? 0);
                    }

                    const rs = (km * farePerKm) + (rideCount * baseFare);
                    return (<td className="rc-col-earnings">{Number.isFinite(rs) ? `${rs.toFixed(2)} Rs.` : '0 Rs.'}</td>);
                  })()}
                  <td className="rc-col-performance">{(() => {
                    if (dateRangeFrom && dateRangeTo) {
                      const cacheKey = `${r.id}:${dateRangeFrom}:${dateRangeTo}`;
                      const data = riderRangeData.get(cacheKey);
                      const perfPct = data?.performancePct ?? 0;
                      return `${Number(perfPct)}%`;
                    }
                    return Number.isFinite(Number(r.performancePct)) ? `${Math.round(Number(r.performancePct))}%` : '0%';
                  })()}</td>
                  <td className="rc-col-total">{Number(r.totalKm || 0).toFixed(2)} km</td>
                  <td className="rc-col-actions">
                    <div className="actions-container">
                      <button className="rc-select rc-chip" onClick={()=> setEditingRider(r)}>Edit</button>
                      <button className="rc-select rc-chip" onClick={async ()=>{
                        const yes = window.confirm('Delete this rider?');
                        if (!yes) return;
                        try{
                          const res = await fetch(`/api/riders/${encodeURIComponent(r.id)}`, { method:'DELETE', credentials:'include' });
                          if (res.status === 401){ window.location.href = '/auth/login'; return; }
                          if (!res.ok){ const t = await res.text().catch(()=>'' ); alert(t || 'Failed to delete'); return; }
                          setRiders(prev => prev.filter(x => String(x.id) !== String(r.id)));
                          setMeta(m => ({ ...m, total: Math.max(0, (m.total||1) - 1) }));
                        }catch(e){ alert(String(e?.message || 'Failed to delete')); }
                      }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && !error && filtered.length === 0 && (
                <tr><td colSpan={7} className="section-note">No riders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="rc-toolbar" aria-label="pagination">
          <div className="rc-filters">
            <button className="rc-select rc-chip" disabled={meta.page<=1 || loading} onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
            <span className="section-note">Page {meta.page} of {meta.pages} • {meta.total} total</span>
            <button className="rc-select rc-chip" disabled={meta.page>=meta.pages || loading} onClick={()=>setPage(p=>Math.min(meta.pages,p+1))}>Next</button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
