import React, { useEffect, useState } from 'react';
import SiteLayout from '../components/SiteLayout.jsx';

export default function Reports(){
  const [metrics, setMetrics] = useState({ totalDeliveries: 0, avgDeliveryMins: 0 });
  const [orders, setOrders] = useState([]);
  const [showTable, setShowTable] = useState(false);
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
          setMetrics(data.metrics || { totalDeliveries: 0, avgDeliveryMins: 0 });
          setOrders(Array.isArray(data.orders) ? data.orders : []);
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
          <p className="rc-subtitle">Gain insights into your delivery operations with detailed reports and visualizations.</p>
        </header>

        <div className="rc-toolbar">
          <div className="rc-filters">
            <button className="rc-select rc-chip" data-tab="overview">Overview</button>
            <button className="rc-select rc-chip" data-tab="performance">Performance</button>
            <button className="rc-select rc-chip" data-tab="custom">Custom Reports</button>
          </div>
        </div>

        <div id="tab-overview">
          <div className="rc-table-wrapper reports-overview">
            <div className="rc-select rc-chip block-chip">
              <div className="section-title reports-stat-title">Total Deliveries</div>
              <div className="reports-stat-value">{metrics.totalDeliveries}</div>
            </div>
            <div className="rc-select rc-chip block-chip">
              <div className="section-title reports-stat-title">Average Delivery Time</div>
              <div className="reports-stat-value">{metrics.avgDeliveryMins} mins</div>
            </div>
          </div>

          <div className="rc-toolbar reports-toolbar-center">
            <div className="section-title reports-stat-title">Delivery Data</div>
            <label className="rc-select rc-chip" style={{display:'inline-flex',alignItems:'center',gap:8}}>
              <input type="checkbox" checked={showTable} onChange={(e)=>setShowTable(e.target.checked)} /> Show Delivery Data Table
            </label>
          </div>

          {showTable && (
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
                  {!loading && !error && orders.map((o,i)=> (
                    <tr key={o.id||o.name||o.order_number||i}>
                      <td className="rc-col-name">#{o.name || o.order_number || o.id}</td>
                      <td className="rc-col-km">-</td>
                      <td className="rc-col-perf">-</td>
                      <td className="rc-col-perf">-</td>
                      <td className="rc-col-perf">-</td>
                      <td className="rc-col-commission">{o.fulfillment_status || 'new'}</td>
                    </tr>
                  ))}
                  {!loading && !error && orders.length === 0 && (
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
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
