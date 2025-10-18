import React, { useEffect, useState } from 'react';
import SiteLayout from '../components/SiteLayout.jsx';
import AssignModal from '../components/AssignModal.jsx';

export default function Dashboard(){
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 25, pages: 1 });

  useEffect(()=>{
    let alive = true;
    (async ()=>{
      setLoading(true); setError('');
      try{
        const params = new URLSearchParams();
        params.set('limit', String(limit));
        params.set('page', String(page));
        const res = await fetch(`/api/orders?${params.toString()}`, { credentials: 'include' });
        if(res.status === 401){ window.location.href = '/auth/login'; return; }
        if(!res.ok) throw new Error('Failed to load orders');
        const data = await res.json();
        if(alive){
          setOrders(Array.isArray(data.orders) ? data.orders : []);
          setMeta({ total: data.meta?.total || 0, page: data.meta?.page || page, limit: data.meta?.limit || limit, pages: data.meta?.pages || 1 });
        }
      }catch(e){ if(alive) setError(e.message || 'Failed to load orders'); }
      finally{ if(alive) setLoading(false); }
    })();
    return ()=>{ alive = false; };
  },[page]);

  function getOrderStatus(o){
    if (!o || typeof o !== 'object') return 'new';
    if (typeof o.current_status === 'string' && String(o.current_status).trim()) return String(o.current_status).toLowerCase().trim();
    return 'new';
  }

  const [showAssign, setShowAssign] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  function openAssign(order){ setActiveOrder(order); setShowAssign(true); }
  function closeAssign(){ setActiveOrder(null); setShowAssign(false); }
  function onAssigned(payload){
    // remove assigned order from the dashboard list so it is not visible and update totals
    try{
      const { orderId } = payload || {};
      if (!orderId) return;
      const normalizedAssigned = String(orderId).replace(/^#+/, '');
      setOrders(prev => prev.filter((o, i) => {
        const key = String(o.id || o.name || o.order_number || i).replace(/^#+/, '');
        return String(key) !== String(normalizedAssigned);
      }));
      // decrement total count to reflect removal
      setMeta(prev => ({ ...(prev || {}), total: Math.max(0, (prev?.total || 0) - 1) }));

      // show toast notification
      try{ if(window && typeof window.showToast === 'function'){ window.showToast(`Order assigned: ${orderId}`, { type: 'success' }); } }catch(_){}
    }catch(e){ /* ignore */ }
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
              <div className="stat-value">{loading ? '…' : meta.total || orders.length}</div>
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
    {!loading && !error && (()=>{
      const visible = Array.isArray(orders) ? orders.filter(o => getOrderStatus(o) === 'new') : [];
      return visible.map((o,i)=>{
        const status = getOrderStatus(o);
        const fullName = o.full_name || ((o.customer && o.customer.full_name) ? o.customer.full_name : '');
        let addr = '-';
        if (typeof o.shipping_address === 'string' && String(o.shipping_address).trim()) {
          addr = String(o.shipping_address).trim();
        } else if (o.shipping_address && typeof o.shipping_address === 'object') {
          addr = [o.shipping_address.address1 || '', o.shipping_address.city || '', o.shipping_address.province || '', o.shipping_address.country || '']
            .map(s => String(s || '').trim()).filter(Boolean).join(', ') || '-';
        } else if (typeof o.billing_address === 'string' && String(o.billing_address).trim()) {
          addr = String(o.billing_address).trim();
        } else if (o.billing_address && typeof o.billing_address === 'object') {
          addr = [o.billing_address.address1 || '', o.billing_address.city || '', o.billing_address.province || '', o.billing_address.country || '']
            .map(s => String(s || '').trim()).filter(Boolean).join(', ') || '-';
        }
                  const displayId = o.name || o.order_number || o.id || i;
                  const canonicalId = String(o.id || o.name || o.order_number || i).replace(/^#+/, '');
                  const dt = o.created_at ? new Date(o.created_at) : null;
                  const dateStr = dt ? dt.toLocaleDateString() : '-';
                  const timeStr = dt ? dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-';
                  return (
                    <tr key={canonicalId} data-status={status}>
                      <td className="rc-col-order">{displayId}</td>
                      <td className="rc-col-customer">{fullName || '-'}</td>
                      <td className="rc-col-address">{addr}</td>
                      <td className="rc-col-status"><span className={`status-chip status-${status}`}>{status.replace('-',' ')}</span></td>
                      <td className="rc-col-date">{dateStr}</td>
                      <td className="rc-col-time">{timeStr}</td>
                      <td className="rc-col-action"><button className="order-action btn-manage" onClick={()=>openAssign(String(o.id || o.name || o.order_number || i))}>Assign</button></td>
                    </tr>
                  );
                });
              })()}
              {!loading && !error && orders.length === 0 && (<tr><td colSpan={7} className="section-note">No recent orders.</td></tr>)}
            </tbody>
          </table>
        </div>

        <div className="rc-toolbar" aria-label="pagination">
          <div className="rc-filters">
            <button className="rc-select rc-chip" disabled={meta.page<=1 || loading} onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
            <span className="section-note">Page {meta.page} of {meta.pages} • {meta.total} total</span>
            <button className="rc-select rc-chip" disabled={meta.page>=meta.pages || loading} onClick={()=>setPage(p=>Math.min(meta.pages,p+1))}>Next</button>
          </div>
        </div>

        {showAssign && activeOrder && (
          <AssignModal orderId={activeOrder} onClose={closeAssign} onAssigned={onAssigned} />
        )}
      </section>
    </SiteLayout>
  );
}
