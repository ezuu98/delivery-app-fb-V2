import React, { useState } from 'react';

export default function RiderProfile() {
  const [range, setRange] = useState('Daily');

  return (
    <section className="page-wrap">
      <h1 className="page-title">Rider Profile</h1>
      <p className="page-subtitle">View detailed performance metrics for individual riders.</p>

      <div className="profile-card">
        <div className="profile-avatar" aria-hidden>👨🏻‍🦰</div>
        <div className="profile-info">
          <div className="profile-name">Lucas Bennett</div>
          <div className="profile-meta muted-text">Rider ID: 12345</div>
          <div className="profile-meta muted-text">Contact: (555) 123-4567</div>
        </div>
      </div>

      <h2 className="section-title">Performance Overview</h2>
      <div className="grid-cards">
        <div className="metric-card"><div className="metric-title">Total Deliveries</div><div className="metric-value">250</div></div>
        <div className="metric-card"><div className="metric-title">Avg. Delivery Time</div><div className="metric-value">35 mins</div></div>
        <div className="metric-card"><div className="metric-title">On-Time Delivery Rate</div><div className="metric-value">95%</div></div>
        <div className="metric-card"><div className="metric-title">Total KM Traveled</div><div className="metric-value">1500 km</div></div>
      </div>

      <div className="section-header">
        <h2 className="section-title">Delivery History</h2>
        <div className="tab-strip small">
          {['Daily','Weekly','Monthly'].map((t)=> (
            <button key={t} className={range===t? 'tab-item active':'tab-item'} onClick={()=>setRange(t)}>{t}</button>
          ))}
        </div>
      </div>

      <div className="panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Deliveries</th>
              <th>Avg. Delivery Time</th>
              <th>Distance (KM)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="muted-text">2024-07-20</td>
              <td>10</td>
              <td>32 mins</td>
              <td>60 km</td>
            </tr>
            <tr>
              <td className="muted-text">2024-07-19</td>
              <td>12</td>
              <td>34 mins</td>
              <td>58 km</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
