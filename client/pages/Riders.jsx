import React, { useEffect, useMemo, useState } from 'react';
import SiteLayout from '../components/SiteLayout.jsx';
import CreateRiderModal from '../components/CreateRiderModal.jsx';
import { DEFAULT_FARE_SETTINGS, FARE_SETTINGS_STORAGE_KEY, readFareSettings } from '../utils/fareSettings.js';

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
  const [riders, setRiders] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 20, pages: 1 });
  const [showCreateRider, setShowCreateRider] = useState(false);
  const [fareSettings, setFareSettings] = useState(DEFAULT_FARE_SETTINGS);

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

  const filtered = useMemo(()=>{
    return riders.filter(r=>{
      if(q && !String(r.name||'').toLowerCase().includes(q.toLowerCase().trim())) return false;
      return true;
    });
  },[riders,q]);

  const farePerKm = useMemo(()=>{
    const rate = Number(fareSettings.farePerKm);
    return Number.isFinite(rate) ? rate : DEFAULT_FARE_SETTINGS.farePerKm;
  },[fareSettings]);

  const baseFare = useMemo(()=>{
    const value = Number(fareSettings.baseFare);
    return Number.isFinite(value) ? value : DEFAULT_FARE_SETTINGS.baseFare;
  },[fareSettings]);

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
          <div className="rc-filters"></div>
            <select className="rc-select rc-select-arrow rc-chip" value={limit} onChange={e=>{ setLimit(parseInt(e.target.value,10)); setPage(1); }}>
              {[10,20,50,100].map(n=> <option key={n} value={n}>{n}/page</option>)}
            </select>
          </div>

        <div className="rc-table-wrapper">
          {showCreateRider && (
            <CreateRiderModal onClose={()=>setShowCreateRider(false)} onCreated={()=>{ window.location.reload(); }} />
          )}
          <table className="rc-table">
            <thead>
              <tr>
                <th className="col-name">Rider Name</th>
                {lastThreeMonths.labels.map((l,idx)=> (
                  <th key={lastThreeMonths.keys[idx]} className="col-month">{l}</th>
                ))}
                <th className="col-earnings">{(() => { const k = lastThreeMonths.keys[lastThreeMonths.keys.length - 2]; const parts = String(k).split('-'); const y = parseInt(parts[0],10); const m = parseInt(parts[1],10); const d = new Date(Number.isFinite(y)?y:new Date().getFullYear(), Number.isFinite(m)?(m-1):new Date().getMonth()-1, 1); const ml = d.toLocaleString(undefined, { month: 'short' }); return `Earnings (${ml}, Rs)`; })()}</th>
                <th className="col-perf">Performance</th>
                <th className="col-total">Total</th>
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
                  {lastThreeMonths.keys.map(k=> (
                    <td key={k} className="rc-col-month">{Number(r.monthlyCounts?.[k] || 0).toFixed(2)} km</td>
                  ))}
                  {(() => {
                    const lastMonthKey = lastThreeMonths.keys[lastThreeMonths.keys.length - 2];
                    const km = Number(r.monthlyCounts?.[lastMonthKey] || 0);
                    const orders = Array.isArray(r.orders) ? r.orders : [];
                    const rideCount = Number(r.monthlyRideCounts?.[lastMonthKey] ?? countOrdersForMonth(orders, lastMonthKey) ?? 0);
                    const rs = (km * farePerKm) + (rideCount * baseFare);
                    return (<td className="rc-col-earnings">{Number.isFinite(rs) ? `${rs.toFixed(2)} Rs.` : '0 Rs.'}</td>);
                  })()}
                  <td className="rc-col-performance">{Number.isFinite(Number(r.performancePct)) ? `${Math.round(Number(r.performancePct))}%` : '0%'}</td>
                  <td className="rc-col-total">{Number(r.totalKm || 0).toFixed(2)} km</td>
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
