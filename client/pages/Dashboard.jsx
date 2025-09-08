import React, { useEffect, useState } from 'react';
import SiteLayout from '../components/SiteLayout.jsx';
import AssignModal from '../components/AssignModal.jsx';

export default function Dashboard(){
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(()=>{
    let alive = true;
    (async ()=>{
      setLoading(true); setError('');
      try{
        const params = new URLSearchParams();
        params.set('limit', '25');
        const res = await fetch(`/api/orders?${params.toString()}`, { credentials: 'include' });
        if(res.status === 401){ window.location.href = '/auth/login'; return; }
        if(!res.ok) throw new Error('Failed to load orders');
        const data = await res.json();
        if(alive){ setOrders(Array.isArray(data.orders) ? data.orders : []); }
      }catch(e){ if(alive) setError(e.message || 'Failed to load orders'); }
      finally{ if(alive) setLoading(false); }
    })();
    return ()=>{ alive = false; };
  },[]);

  function getOrderStatus(o){
    if (o && o.assignment) return 'assigned';
    const tags = Array.isArray(o.tags) ? o.tags : (typeof o.tags === 'string' ? o.tags.split(',') : []);
    const tagStr = tags.join(',').toLowerCase();
    if(tagStr.includes('assigned')) return 'assigned';
    if(o.fulfillment_status === 'fulfilled') return 'delivered';
    if(o.fulfillment_status === 'partial') return 'in-transit';
    return 'new';
  }

  const [showAssign, setShowAssign] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  function openAssign(order){ setActiveOrder(order); setShowAssign(true); }
  function closeAssign(){ setActiveOrder(null); setShowAssign(false); }
  function onAssigned(){
    // refresh orders after assign
    window.location.reload();
  }


  return (
    <SiteLayout>
      <section className="dashboard-orders">
        <header className="rc-header dashboard-header">
          <div className="dashboard-header-left">
            <h2 className="rc-title">Recent Orders</h2>
            <p className="rc-subtitle">Latest orders synced from Shopify.</p>
          </div>
          <div className="dashboard-header-right">
            <div className="stat-card">
              <div className="stat-value">{loading ? '…' : orders.length}</div>
              <div className="stat-label">Orders</div>
            </div>
            <button className="btn-primary" onClick={()=>window.location.reload()}>Refresh</button>
          </div>
        </header>

        <div className="rc-table-wrapper">
          <table className="rc-table dashboard-table">
            <thead>
              <tr>
                <th className="col-order">Order #</th>
                <th className="col-customer">Customer</th>
                <th className="col-address">Address</th>
                <th className="col-status">Status</th>
                <th className="col-date">Date</th>
                <th className="col-time">Time</th>
                <th className="col-action">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (<tr><td colSpan={7} className="section-note">Loading…</td></tr>)}
              {!loading && error && (<tr><td colSpan={7} className="auth-error">{error}</td></tr>)}
              {!loading && !error && orders.map((o,i)=>{
                const status = getOrderStatus(o);
                const fname = o.customer?.first_name || '';
                const lname = o.customer?.last_name || '';
                const addr = (o.shipping_address && `${o.shipping_address.address1||''} ${o.shipping_address.city||''}${o.shipping_address.province?`, ${o.shipping_address.province}`:''}${o.shipping_address.country?`, ${o.shipping_address.country}`:''}`) || '-';
                const displayId = o.name || o.order_number || o.id || i;
                const canonicalId = String(o.id || o.name || o.order_number || i).replace(/^#+/, '');
                const dt = o.created_at ? new Date(o.created_at) : null;
                const dateStr = dt ? dt.toLocaleDateString() : '-';
                const timeStr = dt ? dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-';
                return (
                  <tr key={canonicalId} data-status={status}>
                    <td className="rc-col-order">{displayId && String(displayId).startsWith('#') ? displayId : (`#${displayId}`)}</td>
                    <td className="rc-col-customer">{fname} {lname}</td>
                    <td className="rc-col-address">{addr}</td>
                    <td className="rc-col-status"><span className={`status-chip status-${status}`}>{status.replace('-',' ')}</span></td>
                    <td className="rc-col-date">{dateStr}</td>
                    <td className="rc-col-time">{timeStr}</td>
                    <td className="rc-col-action"><button className="order-action btn-manage" onClick={()=>openAssign(canonicalId)}>Manage</button></td>
                  </tr>
                );
              })}
              {!loading && !error && orders.length === 0 && (<tr><td colSpan={7} className="section-note">No recent orders.</td></tr>)}
            </tbody>
          </table>
        </div>
        {showAssign && activeOrder && (
          <AssignModal orderId={activeOrder} onClose={closeAssign} onAssigned={onAssigned} />
        )}
      </section>
    </SiteLayout>
  );
}
