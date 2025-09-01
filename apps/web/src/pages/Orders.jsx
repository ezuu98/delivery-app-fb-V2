import React, { useMemo, useState } from 'react';

const ORDERS = [
  { id: '#12345', customer: 'Sophia Clark', address: '123 Maple Street, Anytown', status: 'New', time: '10:00 AM', action: 'Assign' },
  { id: '#12346', customer: 'Ethan Bennett', address: '456 Oak Avenue, Anytown', status: 'Assigned', time: '10:15 AM', action: 'View' },
  { id: '#12347', customer: 'Olivia Carter', address: '789 Pine Lane, Anytown', status: 'In Transit', time: '10:30 AM', action: 'Track' },
  { id: '#12348', customer: 'Liam Davis', address: '101 Elm Road, Anytown', status: 'Delivered', time: '10:45 AM', action: 'Details' },
  { id: '#12349', customer: 'Ava Evans', address: '222 Cedar Court, Anytown', status: 'New', time: '11:00 AM', action: 'Assign' }
];

const STATUS_ORDER = ['All', 'New', 'Assigned', 'In Transit', 'Delivered'];

export default function Orders() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(() => {
    return ORDERS.filter((o) =>
      (filter === 'All' || o.status === filter) &&
      (o.id + o.customer + o.address).toLowerCase().includes(query.toLowerCase())
    );
  }, [query, filter]);

  return (
    <section className="page-wrap">
      <h1 className="page-title">Order Management</h1>

      <div className="search-bar">
        <span className="search-icon" aria-hidden>🔎</span>
        <input
          className="search-input"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="tab-strip" role="tablist" aria-label="Order status">
        {STATUS_ORDER.map((s) => (
          <button key={s} className={s === filter ? 'tab-item active' : 'tab-item'} onClick={() => setFilter(s)} role="tab" aria-selected={s===filter}>{s}</button>
        ))}
      </div>

      <div className="panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Status</th>
              <th>Time Placed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id}>
                <td className="muted-text">{o.id}</td>
                <td><a href="#" className="link" onClick={(e)=>e.preventDefault()}>{o.customer}</a></td>
                <td className="muted-text">{o.address}</td>
                <td><span className={`status-badge status-${o.status.replace(' ', '').toLowerCase()}`}>{o.status}</span></td>
                <td className="muted-text">{o.time}</td>
                <td><a className="row-action" href="#" onClick={(e)=>e.preventDefault()}>{o.action}</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
