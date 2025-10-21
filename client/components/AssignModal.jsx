import React, { useEffect, useState } from 'react';

export default function AssignModal({ orderId, onClose, onAssigned }){
  const [riders, setRiders] = useState([]);
  const [packers, setPackers] = useState([]);
  const [selectedRider, setSelectedRider] = useState('');
  const [selectedPacker, setSelectedPacker] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingPackers, setLoadingPackers] = useState(true);
  const [error, setError] = useState('');
  const [errorPackers, setErrorPackers] = useState('');
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
        if(alive) setRiders(Array.isArray(data.riders) ? data.riders : []);
      }catch(e){ if(alive) setError(e.message || 'Failed to load riders'); }
      finally{ if(alive) setLoading(false); }
    })();
    return ()=>{ alive = false; };
  },[]);

  useEffect(()=>{
    let alive = true;
    (async ()=>{
      setLoadingPackers(true);
      setErrorPackers('');
      try{
        const res = await fetch('/api/packers?limit=200', { credentials: 'include' });
        if(res.status === 401){ window.location.href = '/auth/login'; return; }
        if(!res.ok) throw new Error('Failed to load packers');
        const data = await res.json();
        if(alive) setPackers(Array.isArray(data.packers) ? data.packers : []);
      }catch(e){ if(alive) setErrorPackers(e.message || 'Failed to load packers'); }
      finally{ if(alive) setLoadingPackers(false); }
    })();
    return ()=>{ alive = false; };
  },[]);

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
      const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}/assign`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ riderId: selectedRider, paymentMethod: paymentMethod.trim(), amount: amount.trim() }),
      });
      if(res.status === 401){ window.location.href = '/auth/login'; return; }
      const json = await res.json().catch(()=>null);
      if(!res.ok) throw new Error((json && json.error) ? json.error : 'Assign failed');

      const res2 = await fetch(`/api/orders/${encodeURIComponent(orderId)}/assign-packer`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packerId: selectedPacker, paymentMethod: paymentMethod.trim(), amount: amount.trim() }),
      });
      if(res2.status === 401){ window.location.href = '/auth/login'; return; }
      const json2 = await res2.json().catch(()=>null);
      if(!res2.ok) throw new Error((json2 && json2.error) ? json2.error : 'Assign failed');

      if(onAssigned) onAssigned({ orderId, riderId: selectedRider, packerId: selectedPacker, paymentMethod: paymentMethod.trim(), amount: amount.trim() });
      try{ if(window && typeof window.showToast === 'function'){ window.showToast(`Order assigned successfully`, { type: 'success' }); } }catch(_){}
      onClose();
    }catch(e){ alert(e.message || 'Failed to assign'); }
    finally{ setSubmitting(false); }
  }

  const riderError = error || '';
  const packerError = errorPackers || '';
  const isLoading = loading || loadingPackers;

  return (
    <div className="assign-modal-backdrop" role="dialog" aria-modal="true">
      <div className="assign-modal">
        <header className="assign-modal-header">
          <h3 className="assign-modal-title">Assign Rider & Packer</h3>
          <button className="assign-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </header>
        <div className="assign-modal-body">
          {isLoading ? (
            <div className="section-note">Loading…</div>
          ) : (
            <>
              <div className="assign-form">
                <div className="form-group">
                  <label className="field-label">Select Rider
                    <select
                      className="field-input assign-dropdown"
                      value={selectedRider}
                      onChange={e=>setSelectedRider(e.target.value)}
                      disabled={submitting}
                    >
                      <option value="">-- Choose a rider --</option>
                      {riders.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </label>
                  {riderError && <div className="auth-error">{riderError}</div>}
                  {riders.length === 0 && !riderError && <div className="section-note">No riders available</div>}
                </div>

                <div className="form-group">
                  <label className="field-label">Select Packer
                    <select
                      className="field-input assign-dropdown"
                      value={selectedPacker}
                      onChange={e=>setSelectedPacker(e.target.value)}
                      disabled={submitting}
                    >
                      <option value="">-- Choose a packer --</option>
                      {packers.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </label>
                  {packerError && <div className="auth-error">{packerError}</div>}
                  {packers.length === 0 && !packerError && <div className="section-note">No packers available</div>}
                </div>
              </div>

              <div className="assign-modal-actions">
                <button className="btn-secondary" onClick={onClose} disabled={submitting}>Cancel</button>
                <button className="btn-primary" onClick={handleSubmit} disabled={submitting || !selectedRider || !selectedPacker}>
                  {submitting ? 'Assigning…' : 'Assign'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
