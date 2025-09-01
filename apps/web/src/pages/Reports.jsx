import React, { useState } from 'react';

export default function Reports() {
  const [tab, setTab] = useState('Overview');
  const [showTable, setShowTable] = useState(true);

  return (
    <section className="page-wrap">
      <h1 className="page-title">Reporting & Analytics</h1>
      <p className="page-subtitle">Gain insights into your delivery operations with detailed reports and visualizations.</p>

      <div className="tab-strip" role="tablist">
        {['Overview','Performance','Custom Reports'].map((t)=> (
          <button key={t} className={tab===t? 'tab-item active':'tab-item'} onClick={()=>setTab(t)} role="tab" aria-selected={tab===t}>{t}</button>
        ))}
      </div>

      <div className="grid-cards">
        <div className="metric-card">
          <div className="metric-title">Total Deliveries</div>
          <div className="metric-value">1,250</div>
          <div className="metric-delta positive">+10%</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Average Delivery Time</div>
          <div className="metric-value">35 mins</div>
          <div className="metric-delta negative">-5%</div>
        </div>
      </div>

      <div className="section-header">
        <h2 className="section-title">Delivery Data</h2>
        <label className="switch">
          <input type="checkbox" checked={showTable} onChange={(e)=>setShowTable(e.target.checked)} />
          <span className="switch-slider" />
          <span className="switch-label">Show Delivery Data Table</span>
        </label>
      </div>

      {showTable && (
        <div className="panel">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Rider Assigned</th>
                <th>Expected Time</th>
                <th>Actual Delivery Time</th>
                <th>Distance Traveled</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="muted-text">#12345</td>
                <td>Ethan Harper</td>
                <td>40 mins</td>
                <td>30 mins</td>
                <td>5 km</td>
                <td><span className="status-badge status-delivered">Delivered</span></td>
              </tr>
              <tr>
                <td className="muted-text">#12346</td>
                <td>Olivia Bennett</td>
                <td>50 mins</td>
                <td>45 mins</td>
                <td>8 km</td>
                <td><span className="status-badge status-pending">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
