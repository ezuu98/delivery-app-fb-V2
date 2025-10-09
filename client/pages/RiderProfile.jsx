import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout.jsx';
import { formatDurationHM, formatExpectedTime, formatTimeOfDay, resolveActualDuration, resolveExpectedValue, toDateOrNull } from '../utils/orderTime.js';

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
            <div className="rc-select rc-chip">Total Deliveries&nbsp;<strong>{Array.isArray(rider.orders) ? rider.orders.length : 0}</strong></div>
            <div className="rc-select rc-chip">On-Time Rate&nbsp;<strong>{metrics.onTimeRate}%</strong></div>
            <div className="rc-select rc-chip">Total KM Traveled&nbsp;<strong>{Number(rider.totalKm || 0)} km</strong></div>
          </div>
        </div>

        <div className="rc-table-wrapper">
          <table className="rc-table">
            <thead>
              <tr>
                <th className="col-name order-heading">Order</th>
                <th className="col-km date-heading">Date</th>
                <th className="col-start-time start-heading">Start</th>
                <th className="col-expected expected-heading">Expected</th>
                <th className="col-actual actual-heading">Actual</th>
                <th className="col-comm distance-heading">Distance (KM)</th>
              </tr>
            </thead>
            <tbody>
              {(data.riderOrders || []).map((o,i)=> {
                const orderLabel = o.name || o.orderId;
                const createdDate = toDateOrNull(o.created_at);
                const dateDisplay = (createdDate instanceof Date && !Number.isNaN(createdDate.getTime())) ? createdDate.toISOString().slice(0,10) : '-';
                const startDisplay = formatTimeOfDay(o.deliveryStartTime);
                console.log("deliveryStartTime") 
                const expectedValue = resolveExpectedValue(o);
                const expectedDisplay = formatExpectedTime(expectedValue);
                const actualDuration = resolveActualDuration(o);
                const actualDisplay = formatDurationHM(actualDuration);
                const distanceNumber = Number(o.distance_km);
                const distanceDisplay = Number.isFinite(distanceNumber)
                  ? `${distanceNumber.toFixed(2)} km`
                  : (typeof o.distance_km === 'string' && o.distance_km.trim() ? o.distance_km : '-');
                return (
                  <tr key={o.orderId || i}>
                    <td className="rc-col-name order-cell">{orderLabel}</td>
                    <td className="rc-col-km date-cell">{dateDisplay}</td>
                    <td className="rc-col-start-time start-cell">{startDisplay}</td>
                    <td className="rc-col-expected expected-cell">{expectedDisplay}</td>
                    <td className="rc-col-actual actual-time-cell">{actualDisplay}</td>
                    <td className="rc-col-commission distance-cell">{distanceDisplay}</td>
                  </tr>
                );
              })}
              {!data.riderOrders?.length && (history||[]).map((row,i)=> (
                <tr key={`h-${i}`}>
                  <td className="rc-col-name order-cell">{row.date}</td>
                  <td className="rc-col-km date-cell">{row.deliveries}</td>
                  <td className="rc-col-start-time start-cell">-</td>
                  <td className="rc-col-expected expected-cell">{row.avgTime ? `${row.avgTime} min` : '-'}</td>
                  <td className="rc-col-actual actual-time-cell">-</td>
                  <td className="rc-col-commission distance-cell">{Number.isFinite(Number(row.distanceKm)) ? `${Number(row.distanceKm).toFixed(2)} km` : (row.distanceKm || '-')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </SiteLayout>
  );
}
