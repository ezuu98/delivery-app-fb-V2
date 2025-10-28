import React, { useEffect, useState } from 'react';

export default function CreateOrderModal({ onClose, onCreated }){
  const [createdBy, setCreatedBy] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [packedBy, setPackedBy] = useState('');
  const [mapLocation, setMapLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [packers, setPackers] = useState([]);
  const [loadingPackers, setLoadingPackers] = useState(true);
  const [packerError, setPackerError] = useState('');

  useEffect(()=>{
    let alive = true;
    (async ()=>{
      setLoadingPackers(true);
      setPackerError('');
      try{
        const res = await fetch('/api/packers?limit=200', { credentials: 'include' });
        if(res.status === 401){ window.location.href = '/auth/login'; return; }
        if(!res.ok) throw new Error('Failed to load packers');
        const data = await res.json();
        if(alive){
          setPackers(Array.isArray(data.packers) ? data.packers : []);
        }
      }catch(e){ if(alive) setPackerError(e.message || 'Failed to load packers'); }
      finally{ if(alive) setLoadingPackers(false); }
    })();
    return ()=>{ alive = false; };
  },[]);

  async function handleSubmit(e){
    e.preventDefault();
    setError('');

    if(!createdBy.trim()){
      setError('Created by is required');
      return;
    }
    if(customerPhone && customerPhone.length !== 10){
      setError('Phone number must be exactly 10 digits');
      return;
    }

    setSubmitting(true);
    try{
      const res = await fetch('/api/orders', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: createdBy.trim(),
          phone: customerPhone.trim(),
          packed_by: packedBy.trim(),
          shipping_address: mapLocation.trim(),
          notes: notes.trim(),
        }),
      });

      if(res.status === 401){ window.location.href = '/auth/login'; return; }
      const json = await res.json().catch(()=>null);
      if(!res.ok) throw new Error((json && json.error) ? json.error : 'Failed to create order');

      try{ if(window && typeof window.showToast === 'function'){ window.showToast('Order created successfully', { type: 'success' }); } }catch(_){}
      if(onCreated) onCreated();
      onClose();
    }catch(e){
      setError(e.message || 'Failed to create order');
    }
    finally{ setSubmitting(false); }
  }

  return (
    <div className="create-modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="create-modal" onClick={(e) => e.stopPropagation()}>
        <header className="create-modal-header">
          <h3 className="create-modal-title">Create Order</h3>
          <button className="create-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </header>
        <div className="create-modal-body">
          <form onSubmit={handleSubmit}>
            {error && <div className="auth-error">{error}</div>}
            {packerError && <div className="auth-error">{packerError}</div>}

            <div className="form-group">
              <label className="field-label">Created By
                <input
                  type="text"
                  className="field-input create-input"
                  placeholder="Enter creator name"
                  value={createdBy}
                  onChange={e=>setCreatedBy(e.target.value)}
                  disabled={submitting}
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label className="field-label">Phone
                <div className="phone-input-wrapper">
                  <span className="phone-prefix">+92</span>
                  <input
                    type="tel"
                    className="phone-input-field"
                    placeholder="3001234567"
                    value={customerPhone}
                    onChange={e=>{
                      const digits = e.target.value.replace(/\D/g, '');
                      if(digits.length <= 10){
                        setCustomerPhone(digits);
                      }
                    }}
                    disabled={submitting}
                    maxLength="10"
                  />
                </div>
              </label>
              {customerPhone && customerPhone.length !== 10 && (
                <div className="auth-error" style={{ fontSize: '12px', marginTop: '-6px' }}>Phone number must be exactly 10 digits</div>
              )}
            </div>

            <div className="form-group">
              <label className="field-label">Packed By
                {loadingPackers ? (
                  <div className="section-note">Loading packers...</div>
                ) : (
                  <select
                    className="field-input edit-dropdown"
                    value={packedBy}
                    onChange={e=>setPackedBy(e.target.value)}
                    disabled={submitting || packerError}
                  >
                    <option value="">-- Choose a packer --</option>
                    {[...packers].sort((a, b) => a.name.localeCompare(b.name)).map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                )}
                {packers.length === 0 && !loadingPackers && !packerError && <div className="section-note">No packers available</div>}
              </label>
            </div>

            <div className="form-group">
              <label className="field-label">Map Location (Google Map Pin)
                <input
                  type="text"
                  className="field-input create-input"
                  placeholder="Enter delivery location"
                  value={mapLocation}
                  onChange={e=>setMapLocation(e.target.value)}
                  disabled={submitting}
                />
              </label>
            </div>

            <div className="form-group">
              <label className="field-label">Notes
                <textarea
                  className="field-input create-input"
                  placeholder="Enter any additional notes"
                  value={notes}
                  onChange={e=>setNotes(e.target.value)}
                  disabled={submitting}
                  rows="3"
                ></textarea>
              </label>
            </div>

            <div className="create-modal-actions">
              <button type="button" className="btn-secondary" onClick={onClose} disabled={submitting}>Cancel</button>
              <button type="submit" className="btn-primary" disabled={submitting || (customerPhone && customerPhone.length !== 10)}>
                {submitting ? 'Creating…' : 'Create Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
