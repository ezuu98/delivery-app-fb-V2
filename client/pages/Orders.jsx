import React, { useEffect, useMemo, useState } from 'react';
import SiteLayout from '../components/SiteLayout.jsx';
import AssignModal from '../components/AssignModal.jsx';

function getRawStatus(o){
  return (o && typeof o.current_status === 'string') ? o.current_status : '';
}
function getStatusKey(o){
  const raw = getRawStatus(o);
  return raw ? raw.toLowerCase().trim() : '';
}

const FILTER_OPTIONS = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'assigned', label: 'Assigned' },
  { key: 'in-transit', label: 'In transit' },
  { key: 'completed', label: 'Completed' },
];

const STATUS_PARAM_MAP = {
  completed: 'delivered',
};

export default function Orders(){
  const [orders, setOrders] = useState([]);
  const [q, setQ] = useState('');
  const [tab, setTab] = useState('all');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 20, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [shopifyErr, setShopifyErr] = useState('');
  const [shopifyConfigured, setShopifyConfigured] = useState(true);

  const [showAssign, setShowAssign] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(()=>{
    let alive = true;
    (async ()=>{
      setLoading(true); setError(''); setShopifyErr('');
      try{
        const params = new URLSearchParams();
        if(q) params.set('q', q);
        if(tab && tab !== 'all'){
          const statusKey = STATUS_PARAM_MAP[tab] || tab;
          params.set('status', statusKey);
        }
        params.set('page', String(page));
        params.set('limit', String(limit));
        const res = await fetch(`/api/orders?${params.toString()}`, { credentials:'include' });
        if(res.status === 401){ window.location.href = '/auth/login'; return; }
        if(!res.ok) throw new Error('Failed to load orders');
        const data = await res.json();
        if(alive){
          setOrders(Array.isArray(data.orders) ? data.orders : []);
          setShopifyErr(data.shopifyError || '');
          setShopifyConfigured(!!data.shopifyConfigured);
          setMeta({ total: data.meta?.total||0, page: data.meta?.page||1, limit: data.meta?.limit||limit, pages: data.meta?.pages||1 });
        }
      }catch(e){ if(alive){ setError(e.message||'Failed to load orders'); } }
      finally{ if(alive) setLoading(false); }
    })();
    return ()=>{ alive = false; };
  },[q, tab, page, limit]);

  const filtered = useMemo(()=> orders, [orders]);

  // visible respects tab: when tab==='all' show all orders; otherwise filter by status
  const visible = useMemo(()=>{
    if(!Array.isArray(orders)) return [];
    if(tab === 'all') return orders.slice();
    const targetStatus = STATUS_PARAM_MAP[tab] || tab;
    return orders.filter(o => getStatusKey(o) === targetStatus);
  }, [orders, tab]);

  function openAssign(orderId){ setActiveOrder(orderId); setShowAssign(true); }
  function closeAssign(){ setActiveOrder(null); setShowAssign(false); }
  function onAssigned(payload){
    try{
      const { orderId } = payload || {};
      if(!orderId) return;
      const normalizedAssigned = String(orderId).replace(/^#+/, '');
      setPage(1); // refresh orders so assignment is reflected in the list
            try{ if(window && typeof window.showToast === 'function'){ window.showToast(`Order assigned: ${orderId}`, { type: 'success' }); } }catch(_){}
    }catch(e){}
  }

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
            <input className="rc-search-input" type="search" placeholder="Search" value={q} onChange={e=>{ setQ(e.target.value); setPage(1); }} />
          </div>
          <div className="rc-filters">
            {FILTER_OPTIONS.map(({ key, label }) => (
              <button key={key} className={`rc-select rc-chip${tab===key?' active':''}`} onClick={()=>{ setTab(key); setPage(1); }} data-filter={key}>
                {label}
              </button>
            ))}
            <select className="rc-select rc-select-arrow rc-chip" value={limit} onChange={e=>{ setLimit(parseInt(e.target.value,10)); setPage(1); }}>
              {[10,20,50,100].map(n=> <option key={n} value={n}>{n}/page</option>)}
            </select>
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
                <th className="col-rider">Rider</th>
                <th className="col-expected">Expected Time</th>
                <th className="col-actual">Actual Time</th>
                <th className="col-status">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={7} className="section-note">Loading…</td></tr>
              )}
              {!loading && error && (
                <tr><td colSpan={7} className="auth-error">{error}</td></tr>
              )}
              {!loading && !error && visible.map((o,i)=>{
                const statusRaw = getRawStatus(o);
                const statusKey = getStatusKey(o);
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
                const action = statusKey === 'new' ? 'Assign Rider' : statusKey === 'assigned' ? 'View' : statusKey === 'in-transit' ? 'Track' : 'Details';
                const orderId = o.name || o.order_number || o.id;
                return (
                  <tr key={orderId||i} data-status={statusKey}>
                    <td className="rc-col-name">{orderId}</td>
                    <td className="rc-col-km">{fullName || '-'}</td>
                    <td className="rc-col-perf">{addr}</td>
                    <td className="rc-col-rider">{o.rider ? String(o.rider) : (o.assignment?.riderId ? String(o.assignment.riderId) : 'Unassigned')}</td>
                    <td className="rc-col-expected">{o.expected_delivery_time ? new Date(o.expected_delivery_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}</td>
                    <td className="rc-col-actual">{o.actual_delivery_time ? new Date(o.actual_delivery_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}</td>
                    <td className="rc-col-status"><span className={`status-chip status-${statusKey}`}>{statusRaw}</span></td>
                  </tr>
                );
              })}
              {!loading && !error && visible.length === 0 && (
                <tr><td colSpan={7} className="section-note">No orders to display.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="rc-toolbar" aria-label="pagination">
        {showAssign && activeOrder && (
          <AssignModal orderId={activeOrder} onClose={closeAssign} onAssigned={onAssigned} />
        )
        }
          <div className="rc-filters">
            <button className="rc-select rc-chip" disabled={meta.page<=1 || loading} onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
            <span className="section-note">Page {meta.page} of {meta.pages} • {meta.total} total</span>
            <button className="rc-select rc-chip" disabled={meta.page>=meta.pages || loading} onClick={()=>setPage(p=>Math.min(meta.pages,p+1))}>Next</button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
