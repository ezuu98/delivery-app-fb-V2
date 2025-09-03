import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout.jsx';

export default function RiderProfile(){
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(()=>{
    let alive = true;
    (async ()=>{
      setLoading(true); setError('');
      try{
        const res = await fetch(`/api/riders/${id}`, { credentials:'include' });
        if(res.status === 401){ window.location.href = '/auth/login'; return; }
        if(!res.ok) throw new Error('Failed to load rider');
        const json = await res.json();
        if(alive) setData(json);
      }catch(e){ if(alive) setError(e.message||'Failed to load rider'); }
      finally{ if(alive) setLoading(false); }
    })();
    return ()=>{ alive = false; };
  },[id]);

  if(loading){
    return <SiteLayout><section className="section-page"><div className="section-note">Loading…</div></section></SiteLayout>;
  }
  if(error){
    return <SiteLayout><section className="section-page"><div className="auth-error">{error}</div></section></SiteLayout>;
  }
  if(!data){
    return <SiteLayout><section className="section-page"><div className="section-note">Not found</div></section></SiteLayout>;
  }

  const { rider, metrics, history } = data;

  return (
    <SiteLayout>
      <section className="rider-commissions">
        <header className="rc-header">
          <h2 className="rc-title">Rider Profile</h2>
          <p className="rc-subtitle">View detailed performance metrics for individual riders.</p>
        </header>

        <div className="rc-table-wrapper rp-card">
          <div className="rp-details">
            <img src="https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2Ff54e0df2f0fb4bff9c894340e2efe67a?format=webp&width=72" alt="avatar" className="rp-avatar" />
            <div>
              <h3 className="rp-name">{rider.name}</h3>
              <div className="section-note">Rider ID: {rider.id}</div>
            </div>
          </div>
        </div>

        <div className="rc-toolbar rp-stats">
          <div className="rc-filters rp-stats-wrap">
            <div className="rc-select rc-chip">Total Deliveries&nbsp;<strong>{metrics.totalDeliveries}</strong></div>
            <div className="rc-select rc-chip">Avg. Delivery Time&nbsp;<strong>{metrics.avgDeliveryMins} mins</strong></div>
            <div className="rc-select rc-chip">On-Time Rate&nbsp;<strong>{metrics.onTimeRate}%</strong></div>
            <div className="rc-select rc-chip">Total KM Traveled&nbsp;<strong>{metrics.totalKm} km</strong></div>
          </div>
        </div>

        <div className="rc-table-wrapper">
          <table className="rc-table">
            <thead>
              <tr>
                <th className="col-name">Date</th>
                <th className="col-km">Deliveries</th>
                <th className="col-perf">Avg. Delivery Time</th>
                <th className="col-comm">Distance (KM)</th>
              </tr>
            </thead>
            <tbody>
              {(history||[]).map((row,i)=> (
                <tr key={i}>
                  <td className="rc-col-name">{row.date}</td>
                  <td className="rc-col-km">{row.deliveries}</td>
                  <td className="rc-col-perf">{row.avgTime} mins</td>
                  <td className="rc-col-commission">{row.distanceKm} km</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </SiteLayout>
  );
}
