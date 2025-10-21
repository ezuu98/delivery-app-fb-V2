import React, { useEffect, useState } from 'react';

export default function EditOrderModal({ order, onClose, onUpdated }){
  const [riders, setRiders] = useState([]);
  const [packers, setPackers] = useState([]);
  const [selectedRider, setSelectedRider] = useState('');
  const [selectedPacker, setSelectedPacker] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(()=>{
    let alive = true;
    (async ()=>{
      setLoading(true);
      setError('');
      try{
        const res = await fetch('/api/riders?limit=200', { credentials: 'include' });
        if(res.status === 401){ window.location.href = '/auth/login'; return; }
        if(!res.ok) throw new Error('Failed to load riders');
        const data = await res.json();
        if(alive){
          setRiders(Array.isArray(data.riders) ? data.riders : []);
          const riderId = order.assignment?.riderId || order.riderId || order.rider_id || '';
          setSelectedRider(String(riderId));
        }
      }catch(e){ if(alive) setError(e.message || 'Failed to load riders'); }
      finally{ if(alive) setLoading(false); }
    })();
    return ()=>{ alive = false; };
  },[order]);

  useEffect(()=>{
    let alive = true;
    (async ()=>{
      try{
        const res = await fetch('/api/packers?limit=200', { credentials: 'include' });
        if(res.status === 401){ window.location.href = '/auth/login'; return; }
        if(!res.ok) throw new Error('Failed to load packers');
        const data = await res.json();
        if(alive){
          setPackers(Array.isArray(data.packers) ? data.packers : []);
          setSelectedPacker(order.assignment?.packerId || '');
        }
      }catch(e){ if(alive) setError(e.message || 'Failed to load packers'); }
    })();
    return ()=>{ alive = false; };
  },[order]);

  useEffect(()=>{
    setPaymentMethod(order.assignment?.paymentMethod || '');
    setAmount(order.assignment?.amount || '');
  },[order]);

  async function handleSubmit(){
    if(!selectedRider || !selectedPacker){
      alert('Please select both a rider and a packer');
      return;
    }
    if(!paymentMethod.trim()){
      alert('Please enter a payment method');
      return;
    }
    if(!amount.trim()){
      alert('Please enter an amount');
      return;
    }

    setSubmitting(true);
    try{
      const orderId = order.name || order.order_number || order.id;
      const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}/assign`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ riderId: selectedRider, paymentMethod: paymentMethod.trim(), amount: amount.trim() }),
      });
      if(res.status === 401){ window.location.href = '/auth/login'; return; }
      const json = await res.json().catch(()=>null);
      if(!res.ok) throw new Error((json && json.error) ? json.error : 'Update failed');

      const res2 = await fetch(`/api/orders/${encodeURIComponent(orderId)}/assign-packer`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packerId: selectedPacker, paymentMethod: paymentMethod.trim(), amount: amount.trim() }),
      });
      if(res2.status === 401){ window.location.href = '/auth/login'; return; }
      const json2 = await res2.json().catch(()=>null);
      if(!res2.ok) throw new Error((json2 && json2.error) ? json2.error : 'Update failed');

      try{ if(window && typeof window.showToast === 'function'){ window.showToast(`Order updated successfully`, { type: 'success' }); } }catch(_){}
      if(onUpdated) onUpdated();
      onClose();
    }catch(e){ alert(e.message || 'Failed to update order'); }
    finally{ setSubmitting(false); }
  }

  return (
    <div className="edit-modal-backdrop" role="dialog" aria-modal="true">
      <div className="edit-modal">
        <header className="edit-modal-header">
          <h3 className="edit-modal-title">Edit Order Assignment</h3>
          <button className="edit-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </header>
        <div className="edit-modal-body">
          {loading ? (
            <div className="section-note">Loading…</div>
          ) : (
            <>
              {error && <div className="auth-error">{error}</div>}
              <div className="edit-form">
                <div className="form-group">
                  <label className="field-label">Select Rider
                    <select
                      className="field-input edit-dropdown"
                      value={selectedRider}
                      onChange={e=>setSelectedRider(e.target.value)}
                      disabled={submitting}
                    >
                      <option value="">-- Choose a rider --</option>
                      {[...riders].sort((a, b) => a.name.localeCompare(b.name)).map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </label>
                  {riders.length === 0 && !error && <div className="section-note">No riders available</div>}
                </div>

                <div className="form-group">
                  <label className="field-label">Select Packer
                    <select
                      className="field-input edit-dropdown"
                      value={selectedPacker}
                      onChange={e=>setSelectedPacker(e.target.value)}
                      disabled={submitting}
                    >
                      <option value="">-- Choose a packer --</option>
                      {[...packers].sort((a, b) => a.name.localeCompare(b.name)).map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </label>
                  {packers.length === 0 && !error && <div className="section-note">No packers available</div>}
                </div>

                <div className="form-group">
                  <label className="field-label">Payment Method
                    <input
                      type="text"
                      className="field-input edit-dropdown"
                      placeholder="e.g., Cash, Card, Online"
                      value={paymentMethod}
                      onChange={e=>setPaymentMethod(e.target.value)}
                      disabled={submitting}
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label className="field-label">Amount
                    <input
                      type="text"
                      className="field-input edit-dropdown"
                      placeholder="e.g., 500"
                      value={amount}
                      onChange={e=>setAmount(e.target.value)}
                      disabled={submitting}
                    />
                  </label>
                </div>
              </div>

              <div className="edit-modal-actions">
                <button className="btn-secondary" onClick={onClose} disabled={submitting}>Cancel</button>
                <button className="btn-primary" onClick={handleSubmit} disabled={submitting || !selectedRider || !selectedPacker}>
                  {submitting ? 'Updating…' : 'Update'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
