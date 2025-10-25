import React, { useEffect, useState } from 'react';
import SiteLayout from '../components/SiteLayout.jsx';

export default function Reports(){
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(()=>{
    let alive = true;
    (async ()=>{
      setLoading(true); setError('');
      try{
        const res = await fetch('/api/reports', { credentials:'include' });
        if(res.status === 401){ window.location.href = '/auth/login'; return; }
        if(!res.ok) throw new Error('Failed to load reports');
        const data = await res.json();
        if(alive){
          setDeliveries(Array.isArray(data.deliveries) ? data.deliveries : []);
        }
      }catch(e){ if(alive) setError(e.message||'Failed to load reports'); }
      finally{ if(alive) setLoading(false); }
    })();
    return ()=>{ alive = false; };
  },[]);

  return (
    <SiteLayout>
      <section className="rider-commissions">
        <header className="rc-header">
          <h2 className="rc-title">Reporting & Analytics</h2>
        </header>

        <div id="tab-overview">
          <div className="rc-table-wrapper">
              <table className="rc-table">
                <thead>
                  <tr>
                    <th className="col-name">Order Number</th>
                    <th className="col-km">Rider Assigned</th>
                    <th className="col-perf">Expected Time</th>
                    <th className="col-perf">Actual Delivery Time</th>
                    <th className="col-perf">Distance Traveled</th>
                    <th className="col-comm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && !error && deliveries.map((d,i)=> (
                    <tr key={d.orderId||i}>
                      <td className="rc-col-name">#{d.orderNumber || d.orderId}</td>
                      <td className="rc-col-km">{d.riderId || '-'}</td>
                      <td className="rc-col-perf">{d.expectedMinutes!=null ? `${d.expectedMinutes} mins` : '-'}</td>
                      <td className="rc-col-perf">{d.durationMins!=null ? `${d.durationMins} mins` : '-'}</td>
                      <td className="rc-col-perf">-</td>
                      <td className="rc-col-commission">{d.status || 'new'}</td>
                    </tr>
                  ))}
                  {!loading && !error && deliveries.length === 0 && (
                    <tr><td colSpan={6} className="section-note">No data.</td></tr>
                  )}
                  {loading && (
                    <tr><td colSpan={6} className="section-note">Loading…</td></tr>
                  )}
                  {error && (
                    <tr><td colSpan={6} className="auth-error">{error}</td></tr>
                  )}
                </tbody>
              </table>
            </div>
        </div>
      </section>
    </SiteLayout>
  );
}
