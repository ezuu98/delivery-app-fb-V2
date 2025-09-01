import React, { useEffect, useMemo, useState } from 'react';
import Modal from '../components/Modal.jsx';

const STATUS_ORDER = ['All', 'New', 'Assigned', 'In Transit', 'Delivered'];

export default function Orders() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [orders, setOrders] = useState([]);
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal state
  const [createOpen, setCreateOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Create form
  const [customer, setCustomer] = useState('');
  const [address, setAddress] = useState('');
  const [selectedRiderId, setSelectedRiderId] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [oRes, rRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/riders')
        ]);
        const [o, r] = await Promise.all([oRes.json(), rRes.json()]);
        setOrders(o);
        setRiders(r);
      } catch (e) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return orders.filter((o) =>
      (filter === 'All' || o.status === filter) &&
      (o.id + o.customer + o.address).toLowerCase().includes(query.toLowerCase())
    );
  }, [orders, query, filter]);

  function timeOf(iso) {
    try { return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); } catch { return ''; }
  }

  async function createOrder() {
    const body = { customer, address };
    const res = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error('Create failed');
    const created = await res.json();
    setOrders((cur) => [created, ...cur]);
    setCustomer('');
    setAddress('');
    setCreateOpen(false);
  }

  async function assignOrder() {
    if (!selectedOrder) return;
    const res = await fetch(`/api/orders/${encodeURIComponent(selectedOrder.id)}/assign`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ riderId: Number(selectedRiderId) })
    });
    if (!res.ok) throw new Error('Assign failed');
    const updated = await res.json();
    setOrders((cur) => cur.map(o => o.id === updated.id ? updated : o));
    setAssignOpen(false);
    setSelectedRiderId('');
  }

  async function updateStatus(id, status) {
    const res = await fetch(`/api/orders/${encodeURIComponent(id)}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    if (!res.ok) return;
    const updated = await res.json();
    setOrders((cur) => cur.map(o => o.id === updated.id ? updated : o));
  }

  return (
    <section className="page-wrap">
      <div className="page-header">
        <h1 className="page-title">Order Management</h1>
        <div className="btn-row">
          <div className="search-bar" role="search">
            <span className="search-icon" aria-hidden>🔎</span>
            <input
              className="search-input"
              placeholder="Search orders"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="primary-btn" onClick={() => setCreateOpen(true)}>New Order</button>
        </div>
      </div>

      <div className="tab-strip" role="tablist" aria-label="Order status">
        {STATUS_ORDER.map((s) => (
          <button key={s} className={s === filter ? 'tab-item active' : 'tab-item'} onClick={() => setFilter(s)} role="tab" aria-selected={s===filter}>{s}</button>
        ))}
      </div>

      <div className="panel">
        {error && <div className="error-banner" role="alert">{error}</div>}
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
            {!loading && filtered.map((o) => (
              <tr key={o.id}>
                <td className="muted-text">{o.id}</td>
                <td><a href="#" className="link" onClick={(e)=>e.preventDefault()}>{o.customer}</a></td>
                <td className="muted-text">{o.address}</td>
                <td>
                  <select className="select-input" value={o.status} onChange={(e)=>updateStatus(o.id, e.target.value)}>
                    {STATUS_ORDER.filter(s=>s!=='All').map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="muted-text">{timeOf(o.timePlaced)}</td>
                <td>
                  <button className="ghost-btn" onClick={()=>{ setSelectedOrder(o); setAssignOpen(true); }}>Assign</button>
                </td>
              </tr>
            ))}
            {loading && (
              <tr><td colSpan="6" className="muted-text">Loading…</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={createOpen} title="Create Order" onClose={()=>setCreateOpen(false)}
        footer={(
          <>
            <button className="ghost-btn" onClick={()=>setCreateOpen(false)}>Cancel</button>
            <button className="primary-btn" onClick={async()=>{ try { await createOrder(); } catch { setError('Create failed'); } }}>Create</button>
          </>
        )}
      >
        <div className="control-group">
          <label className="control-label" htmlFor="customer">Customer</label>
          <input id="customer" className="text-input" value={customer} onChange={(e)=>setCustomer(e.target.value)} placeholder="Full name" />
        </div>
        <div className="control-group">
          <label className="control-label" htmlFor="address">Address</label>
          <input id="address" className="text-input" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="123 Main St, City" />
        </div>
      </Modal>

      <Modal open={assignOpen} title="Assign Rider" onClose={()=>setAssignOpen(false)}
        footer={(
          <>
            <button className="ghost-btn" onClick={()=>setAssignOpen(false)}>Cancel</button>
            <button className="primary-btn" onClick={async()=>{ try { await assignOrder(); } catch { setError('Assign failed'); } }}>Assign</button>
          </>
        )}
      >
        <div className="control-group">
          <label className="control-label" htmlFor="rider">Select rider</label>
          <select id="rider" className="select-input" value={selectedRiderId} onChange={(e)=>setSelectedRiderId(e.target.value)}>
            <option value="" disabled>Select…</option>
            {riders.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>
      </Modal>
    </section>
  );
}
