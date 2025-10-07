import React, { useEffect, useMemo, useState } from 'react';
import SiteLayout from '../components/SiteLayout.jsx';
import CreateRiderModal from '../components/CreateRiderModal.jsx';

export default function Riders(){
  const [riders, setRiders] = useState([]);
  const [q, setQ] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [riderFilter, setRiderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 20, pages: 1 });
  const [showCreateRider, setShowCreateRider] = useState(false);

  useEffect(()=>{
    let alive = true;
    (async ()=>{
      setLoading(true); setError('');
      try{
        const params = new URLSearchParams();
        if(q) params.set('q', q);
        if(statusFilter !== 'all') params.set('status', statusFilter);
        if(dateFilter !== 'all') params.set('lastDays', dateFilter);
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
  },[q,statusFilter,dateFilter,page,limit]);

  const filtered = useMemo(()=>{
    return riders.filter(r=>{
      if(q && !r.name.toLowerCase().includes(q.toLowerCase().trim())) return false;
      if(statusFilter !== 'all' && r.status !== statusFilter) return false;
      if(riderFilter !== 'all' && String(r.id) !== String(riderFilter)) return false;
      if(dateFilter !== 'all'){
        const last = parseInt(r.lastActiveDays,10) || 9999;
        const n = parseInt(dateFilter,10);
        if(!(last <= n)) return false;
      }
      return true;
    });
  },[riders,q,statusFilter,riderFilter,dateFilter]);

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
            <select className="rc-select rc-select-arrow rc-chip" value={dateFilter} onChange={e=>{ setDateFilter(e.target.value); setPage(1); }}>
              <option value="all">Date Range</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
            </select>
            <select className="rc-select rc-select-arrow rc-chip" value={riderFilter} onChange={e=>setRiderFilter(e.target.value)}>
              <option value="all">Rider</option>
              {riders.map(r => (<option key={r.id} value={r.id}>{r.name}</option>))}
            </select>
            <select className="rc-select rc-select-arrow rc-chip" value={statusFilter} onChange={e=>{ setStatusFilter(e.target.value); setPage(1); }}>
              <option value="all">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
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
                <th className="col-total">Total</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={5} className="section-note">Loading…</td></tr>
              )}
              {!loading && error && (
                <tr><td colSpan={5} className="auth-error">{error}</td></tr>
              )}
              {!loading && !error && filtered.map(r => (
                <tr key={r.id} data-rider-id={r.id} data-status={r.status} data-last-days={r.lastActiveDays}>
                  <td className="rc-col-name"><a className="rider-name-link" href={`/riders/${r.id}`}>{r.name}</a></td>
                  {lastThreeMonths.keys.map(k=> (
                    <td key={k} className="rc-col-month">{Number(r.monthlyCounts?.[k] || 0).toFixed(2)} km</td>
                  ))}
                  <td className="rc-col-total">{Number(r.totalKm || 0).toFixed(2)} km</td>
                </tr>
              ))}
              {!loading && !error && filtered.length === 0 && (
                <tr><td colSpan={5} className="section-note">No riders found.</td></tr>
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
