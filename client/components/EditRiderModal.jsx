import React, { useState, useMemo } from 'react';

export default function EditRiderModal({ rider, onClose, onUpdated }){
  const initialName = useMemo(()=> String(rider?.name || rider?.displayName || ''), [rider]);
  const initialContact = useMemo(()=> {
    const raw = String(rider?.contactNumber || '').trim();
    const digits = raw.replace(/\D+/g,'');
    // Expect stored value like +923001234567; display last 10 digits when possible
    if (digits.length >= 10) return digits.slice(-10);
    return digits;
  }, [rider]);

  const [fullName, setFullName] = useState(initialName);
  const [contactNumber, setContactNumber] = useState(initialContact);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const COUNTRY_CODE = '+92';
  function formatPhoneNumber(value){
    const digits = String(value || '').replace(/\D+/g, '');
    if (digits.length === 0) return '';
    if (digits.startsWith('92')) return COUNTRY_CODE + digits.slice(2);
    return COUNTRY_CODE + digits;
  }

  async function save(){
    setSubmitted(true); setError(''); setOk('');
    const fn = String(fullName).trim();
    const cnRaw = String(contactNumber).trim();
    const digits = cnRaw.replace(/\D+/g,'');
    if (!fn && digits.length === 0){ setError('Enter a name or mobile'); return; }
    if (digits && digits.length !== 10){ setError('numbers should be 10 digit'); return; }

    setLoading(true);
    try{
      const payload = {};
      if (fn) payload.displayName = fn;
      if (digits) payload.contactNumber = formatPhoneNumber(digits);
      const res = await fetch(`/api/riders/${encodeURIComponent(rider.id)}`, {
        method: 'PATCH', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      const json = await res.json().catch(()=>({}));
      if (res.status === 401){ window.location.href = '/auth/login'; return; }
      if (!res.ok){ setError(String(json && (json.error || json.message) || 'Failed to update rider')); return; }
      setOk('Saved');
      if (onUpdated){ onUpdated(json.data && json.data.rider ? json.data.rider : null); }
      setTimeout(()=>{ if(onClose) onClose(); }, 450);
    }catch(e){ setError(String(e?.message || 'Failed to update rider')); }
    finally{ setLoading(false); }
  }

  return (
    <div className="edit-modal-backdrop" role="dialog" aria-modal="true">
      <div className="edit-modal">
        <header className="edit-modal-header">
          <h3 className="edit-modal-title">Edit Rider</h3>
          <button className="edit-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </header>
        <div className="edit-modal-body">
          {ok && <div className="auth-success">{ok}</div>}
          <label className="field-label">Full name
            <input className="field-input" value={fullName} onChange={e=> setFullName(e.target.value)} />
          </label>
          <label className="field-label">Contact number
            <div className="phone-input-wrapper">
              <span className="phone-prefix">+92</span>
              <input
                className={"field-input phone-input-field" + (submitted && (contactNumber && contactNumber.replace(/\D+/g,'').length !== 10 ? ' input-error' : ''))}
                type="tel"
                inputMode="tel"
                pattern="[0-9]{10}"
                placeholder="3001234567"
                value={contactNumber}
                onChange={e=>{
                  const val = e.target.value.replace(/\D+/g,'').slice(0,10);
                  setContactNumber(val);
                }}
              />
            </div>
          </label>
          {error && <div className="auth-error">{error}</div>}
          <div className="edit-modal-actions">
            <button className="btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
            <button className="btn-primary" onClick={save} disabled={loading}>{loading ? 'Saving…' : 'Save'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
