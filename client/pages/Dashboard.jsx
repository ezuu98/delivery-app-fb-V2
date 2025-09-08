import React, { useEffect, useState } from 'react';
import SiteLayout from '../components/SiteLayout.jsx';

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
        params.set('limit', '10');
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
    const tags = Array.isArray(o.tags) ? o.tags : (typeof o.tags === 'string' ? o.tags.split(',') : []);
    const tagStr = tags.join(',').toLowerCase();
    if(tagStr.includes('assigned')) return 'assigned';
    if(o.fulfillment_status === 'fulfilled') return 'delivered';
    if(o.fulfillment_status === 'partial') return 'in-transit';
    return 'new';
  }

  return (
    <SiteLayout>
      <section className="dashboard-orders">
        <header className="rc-header">
          <h2 className="rc-title">Recent Orders</h2>
          <p className="rc-subtitle">Latest orders synced from Shopify.</p>
        </header>

        <div className="rc-table-wrapper">
          <table className="rc-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Status</th>
                <th>Placed</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (<tr><td colSpan={6} className="section-note">Loading…</td></tr>)}
              {!loading && error && (<tr><td colSpan={6} className="auth-error">{error}</td></tr>)}
              {!loading && !error && orders.map((o,i)=>{
                const status = getOrderStatus(o);
                const fname = o.customer?.first_name || '';
                const lname = o.customer?.last_name || '';
                const addr = (o.shipping_address && `${o.shipping_address.address1||''} ${o.shipping_address.city||''}${o.shipping_address.province?`, ${o.shipping_address.province}`:''}${o.shipping_address.country?`, ${o.shipping_address.country}`:''}`) || '-';
                const orderId = o.name || o.order_number || o.id || i;
                return (
                  <tr key={orderId} data-status={status}>
                    <td>#{orderId}</td>
                    <td>{fname} {lname}</td>
                    <td>{addr}</td>
                    <td><span className={`status-chip status-${status}`}>{status.replace('-',' ')}</span></td>
                    <td>{o.created_at ? new Date(o.created_at).toLocaleString() : '-'}</td>
                    <td><a className="order-action" href={`/orders`}>Manage</a></td>
                  </tr>
                );
              })}
              {!loading && !error && orders.length === 0 && (<tr><td colSpan={6} className="section-note">No recent orders.</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>
    </SiteLayout>
  );
}
