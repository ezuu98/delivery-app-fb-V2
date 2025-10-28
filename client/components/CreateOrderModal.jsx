import React, { useState } from 'react';

export default function CreateOrderModal({ onClose, onCreated }){
  const [orderId, setOrderId] = useState('');
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

    if(!customerName.trim()){
      setError('Customer name is required');
      return;
    }
    if(!address.trim()){
      setError('Address is required');
      return;
    }
    if(!amount.trim()){
      setError('Amount is required');
      return;
    }
    if(!paymentMethod.trim()){
      setError('Payment method is required');
      return;
    }

    setSubmitting(true);
    try{
      const res = await fetch('/api/orders', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: customerName.trim(),
          email: customerEmail.trim(),
          phone: customerPhone.trim(),
          shipping_address: address.trim(),
          amount: amount.trim(),
          paymentMethod: paymentMethod.trim(),
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

            <div className="form-group">
              <label className="field-label">Customer Name
                <input
                  type="text"
                  className="field-input create-input"
                  placeholder="Enter customer name"
                  value={customerName}
                  onChange={e=>setCustomerName(e.target.value)}
                  disabled={submitting}
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label className="field-label">Email (Optional)
                <input
                  type="email"
                  className="field-input create-input"
                  placeholder="customer@example.com"
                  value={customerEmail}
                  onChange={e=>setCustomerEmail(e.target.value)}
                  disabled={submitting}
                />
              </label>
            </div>

            <div className="form-group">
              <label className="field-label">Phone (Optional)
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
              <label className="field-label">Address
                <textarea
                  className="field-input create-input"
                  placeholder="Enter delivery address"
                  value={address}
                  onChange={e=>setAddress(e.target.value)}
                  disabled={submitting}
                  rows="3"
                  required
                ></textarea>
              </label>
            </div>

            <div className="form-group">
              <label className="field-label">Amount
                <input
                  type="text"
                  className="field-input create-input"
                  placeholder="e.g., 500"
                  value={amount}
                  onChange={e=>setAmount(e.target.value)}
                  disabled={submitting}
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label className="field-label">Payment Method
                <input
                  type="text"
                  className="field-input create-input"
                  placeholder="e.g., Cash, Card, Online"
                  value={paymentMethod}
                  onChange={e=>setPaymentMethod(e.target.value)}
                  disabled={submitting}
                  required
                />
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
