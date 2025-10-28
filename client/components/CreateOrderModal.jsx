import React, { useState } from 'react';

export default function CreateOrderModal({ onClose, onCreated }){
  const [createdBy, setCreatedBy] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [packedBy, setPackedBy] = useState('');
  const [mapLocation, setMapLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    setError('');

    if(!createdBy.trim()){
      setError('Created by is required');
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

            <input
              type="hidden"
              value={orderId}
              onChange={e=>setOrderId(e.target.value)}
            />

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
                <input
                  type="tel"
                  className="field-input create-input"
                  placeholder="1234567890"
                  value={customerPhone}
                  onChange={e=>setCustomerPhone(e.target.value)}
                  disabled={submitting}
                />
              </label>
            </div>

            <div className="form-group">
              <label className="field-label">Packed By
                <input
                  type="text"
                  className="field-input create-input"
                  placeholder="Enter packer name"
                  value={packedBy}
                  onChange={e=>setPackedBy(e.target.value)}
                  disabled={submitting}
                />
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
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? 'Creating…' : 'Create Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
