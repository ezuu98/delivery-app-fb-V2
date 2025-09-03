import React, { useEffect, useMemo, useState } from 'react';
import SiteLayout from '../components/SiteLayout.jsx';

function getOrderStatus(o){
  const tags = Array.isArray(o.tags) ? o.tags : (typeof o.tags === 'string' ? o.tags.split(',') : []);
  const tagStr = tags.join(',').toLowerCase();
  if(tagStr.includes('assigned')) return 'assigned';
  if(o.fulfillment_status === 'fulfilled') return 'delivered';
  if(o.fulfillment_status === 'partial') return 'in-transit';
  return 'new';
}

export default function Orders(){
  const [orders, setOrders] = useState([]);
  const [q, setQ] = useState('');
  const [tab, setTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [shopifyErr, setShopifyErr] = useState('');
  const [shopifyConfigured, setShopifyConfigured] = useState(true);

  useEffect(()=>{
    let alive = true;
    (async ()=>{
      setLoading(true); setError(''); setShopifyErr('');
      try{
        const res = await fetch('/api/orders', { credentials:'include' });
        if(res.status === 401){ window.location.href = '/auth/login'; return; }
        if(!res.ok) throw new Error('Failed to load orders');
        const data = await res.json();
        if(alive){
          setOrders(Array.isArray(data.orders) ? data.orders : []);
          setShopifyErr(data.shopifyError || '');
          setShopifyConfigured(!!data.shopifyConfigured);
        }
      }catch(e){ if(alive){ setError(e.message||'Failed to load orders'); } }
      finally{ if(alive) setLoading(false); }
    })();
    return ()=>{ alive = false; };
  },[]);

  const filtered = useMemo(()=>{
    const ql = q.toLowerCase().trim();
    return orders.filter(o=>{
      const status = getOrderStatus(o);
      if(tab !== 'all' && status !== tab) return false;
      if(ql){
        const name = String(o.name || o.order_number || o.id || '').toLowerCase();
        const customer = [o.customer?.first_name||'', o.customer?.last_name||''].join(' ').toLowerCase();
        const addr = [o.shipping_address?.address1||'', o.shipping_address?.city||'', o.shipping_address?.province||'', o.shipping_address?.country||''].join(' ').toLowerCase();
        const text = `${name} ${customer} ${addr}`;
        if(!text.includes(ql)) return false;
      }
      return true;
    });
  },[orders,q,tab]);

  return (
    <SiteLayout>
      <section className="rider-commissions">
        <header className="rc-header">
          <h2 className="rc-title">Order Management</h2>
          <p className="rc-subtitle">Manage orders synced from Shopify.</p>
        </header>

        <div className="rc-toolbar">
          <div className="rc-search">
            <span className="rc-search-icon" aria-hidden="true"></span>
            <input className="rc-search-input" type="search" placeholder="Search" value={q} onChange={e=>setQ(e.target.value)} />
          </div>
          <div className="rc-filters">
            {['all','new','assigned','in-transit','delivered'].map(k=> (
              <button key={k} className={`rc-select rc-chip${tab===k?' active':''}`} onClick={()=>setTab(k)} data-filter={k}>
                {k==='all'?'All':k.replace('-',' ')}
              </button>
            ))}
          </div>
        </div>

        {!shopifyConfigured && (
          <div className="section-note">Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync.</div>
        )}
        {shopifyErr && (<div className="auth-error">{shopifyErr}</div>)}

        <div className="rc-table-wrapper">
          <table className="rc-table">
            <thead>
              <tr>
                <th className="col-name">Order #</th>
                <th className="col-km">Customer</th>
                <th className="col-perf">Address</th>
                <th className="col-comm">Status</th>
                <th className="col-comm">Time Placed</th>
                <th className="col-comm">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={6} className="section-note">Loading…</td></tr>
              )}
              {!loading && error && (
                <tr><td colSpan={6} className="auth-error">{error}</td></tr>
              )}
              {!loading && !error && filtered.map((o,i)=>{
                const status = getOrderStatus(o);
                const fname = o.customer?.first_name || '';
                const lname = o.customer?.last_name || '';
                const addr = (o.shipping_address && `${o.shipping_address.address1||''} ${o.shipping_address.city||''}${o.shipping_address.province?`, ${o.shipping_address.province}`:''}${o.shipping_address.country?`, ${o.shipping_address.country}`:''}`) || '-';
                const action = status === 'new' ? 'Assign' : status === 'assigned' ? 'View' : status === 'in-transit' ? 'Track' : 'Details';
                const orderId = o.name || o.order_number || o.id;
                return (
                  <tr key={orderId||i} data-status={status}>
                    <td className="rc-col-name">#{orderId}</td>
                    <td className="rc-col-km">{fname} {lname}</td>
                    <td className="rc-col-perf">{addr}</td>
                    <td className="rc-col-commission"><span className={`status-chip status-${status}`}>{status.replace('-',' ')}</span></td>
                    <td className="rc-col-commission">{o.created_at ? new Date(o.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}</td>
                    <td className="rc-col-commission"><a href="#" className="order-action" data-action={action.toLowerCase()}>{action}</a></td>
                  </tr>
                );
              })}
              {!loading && !error && filtered.length === 0 && (
                <tr><td colSpan={6} className="section-note">No orders to display.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </SiteLayout>
  );
}
