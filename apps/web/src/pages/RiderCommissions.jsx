import React, { useMemo, useState } from 'react';

const DATA = [
  { name: 'Ethan Carter', km: 120, perf: 85, commission: 150 },
  { name: 'Olivia Bennett', km: 150, perf: 92, commission: 180 },
  { name: 'Noah Thompson', km: 100, perf: 78, commission: 120 },
  { name: 'Ava Martinez', km: 130, perf: 88, commission: 160 },
  { name: 'Liam Harris', km: 110, perf: 82, commission: 130 },
  { name: 'Sophia Clark', km: 140, perf: 90, commission: 170 }
];

export default function RiderCommissions() {
  const [query, setQuery] = useState('');

  const rows = useMemo(() => DATA.filter(d => d.name.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <section className="page-wrap">
      <h1 className="page-title">Rider Commissions</h1>
      <p className="page-subtitle">View and manage rider commissions based on performance and distance traveled.</p>

      <div className="search-bar">
        <span className="search-icon" aria-hidden>🔎</span>
        <input className="search-input" placeholder="Search" value={query} onChange={(e)=>setQuery(e.target.value)} />
      </div>

      <div className="filter-bar">
        <button className="chip">Date Range</button>
        <button className="chip">Rider</button>
        <button className="chip">Status</button>
      </div>

      <div className="panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>Rider Name</th>
              <th>Total KM Traveled</th>
              <th>Delivery Performance</th>
              <th>Commission Earned</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <td>{r.name}</td>
                <td className="muted-text">{r.km} km</td>
                <td>
                  <div className="progress-row">
                    <div className="progress-bar"><span style={{width: r.perf + '%'}} className="progress-fill" /></div>
                    <span className="progress-value">{r.perf}</span>
                  </div>
                </td>
                <td className="muted-text">${r.commission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
