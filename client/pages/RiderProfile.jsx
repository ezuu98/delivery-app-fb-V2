import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout.jsx';
import { formatDurationHM, formatExpectedTime, formatTimeOfDay, resolveActualDuration, resolveExpectedValue, resolveStartTime, toDateOrNull } from '../utils/orderTime.js';

function toDateOrNull(value){
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value?.toDate === 'function') { try { return value.toDate(); } catch { return null; } }
  if (typeof value === 'object' && value.seconds !== undefined) { const s = Number(value.seconds); if (Number.isFinite(s)) return new Date(s*1000); }
  if (typeof value === 'number') { if (!Number.isFinite(value)) return null; return value > 1e12 ? new Date(value) : new Date(value*1000); }
  if (typeof value === 'string') { const t = Date.parse(value); if (Number.isFinite(t)) return new Date(t); }
  return null;
}
function extractDurationMinutes(value){
  if (value && typeof value === 'object' && !(value instanceof Date)){
    if (Number.isFinite(value.minutes)) return Number(value.minutes);
    if (Number.isFinite(value.expectedMinutes)) return Number(value.expectedMinutes);
    if (Number.isFinite(value.seconds)) return Number(value.seconds) / 60;
    if (value.duration !== undefined) return extractDurationMinutes(value.duration);
    if (value.value !== undefined) return extractDurationMinutes(value.value);
  }
  if (typeof value === 'number' && Number.isFinite(value) && Math.abs(value) < 1e6) return value;
  if (typeof value === 'string'){
    const trimmed = value.trim();
    if (!trimmed) return null;
    const minuteMatch = trimmed.match(/^(-?\d+(?:\.\d+)?)\s*(min|mins|minutes)$/i);
    if (minuteMatch) return parseFloat(minuteMatch[1]);
    const secondMatch = trimmed.match(/^(-?\d+(?:\.\d+)?)\s*(sec|secs|seconds)$/i);
    if (secondMatch) return parseFloat(secondMatch[1]) / 60;
    const numeric = Number(trimmed);
    if (Number.isFinite(numeric) && Math.abs(numeric) < 1e6) return numeric;
  }
  return null;
}

function formatTime(value){
  if (value === null || value === undefined || value === '') return '-';
  if (value && typeof value === 'object' && !(value instanceof Date)){
    if (value.expectedAt) return formatTime(value.expectedAt);
    if (value.at) return formatTime(value.at);
    if (value.value !== undefined && value.value !== value) return formatTime(value.value);
  }
  const minutes = extractDurationMinutes(value);
  if (minutes !== null){
    const rounded = Math.round(minutes);
    return `${rounded} mins`;
  }
  const d = toDateOrNull(value);
  if (!(d instanceof Date) || Number.isNaN(d.getTime())){
    if (typeof value === 'string'){
      const trimmed = value.trim();
      return trimmed || '-';
    }
    return '-';
  }
  try { return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); } catch { return '-'; }
}

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
                <th className="col-name">Order</th>
                <th className="col-km">Date</th>
                <th className="col-perf">Expected</th>
                <th className="col-perf">Actual</th>
                <th className="col-comm">Distance (KM)</th>
              </tr>
            </thead>
            <tbody>
              {(data.riderOrders || []).map((o,i)=> (
                <tr key={o.orderId || i}>
                  <td className="rc-col-name">{o.name || o.orderId}</td>
                  <td className="rc-col-km">{toDateOrNull(o.created_at)?.toISOString().slice(0,10) || '-'}</td>
                  <td className="rc-col-perf">{formatTime(o.expected_delivery_time)}</td>
                  <td className="rc-col-perf">{formatTime(o.actual_delivery_time)}</td>
                  <td className="rc-col-commission">{Number.isFinite(Number(o.distance_km)) ? Number(o.distance_km).toFixed(2) : (o.distance_km || '-')} km</td>
                </tr>
              ))}
              {!data.riderOrders?.length && (history||[]).map((row,i)=> (
                <tr key={`h-${i}`}>
                  <td className="rc-col-name">{row.date}</td>
                  <td className="rc-col-km">{row.deliveries}</td>
                  <td className="rc-col-perf">{row.avgTime} mins</td>
                  <td className="rc-col-commission">{row.distanceKm} km</td>
                  <td className="rc-col-commission"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </SiteLayout>
  );
}
