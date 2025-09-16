import React, { useState } from 'react';

export default function CreateRiderModal({ onClose, onCreated }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  async function create(){
    setError(''); setOk('');
    const em = String(email).trim();
    const pw = String(password);
    const fn = String(fullName).trim();
    const cn = String(contactNumber).trim();
    const digits = cn.replace(/\D+/g, '');
    if(!fn || !cn || !em || !pw){ setError('Full name, mobile, email and password are required'); return; }
    if(digits.length < 7){ setError('Please enter a valid mobile number'); return; }
    setLoading(true);
    try{
      const res = await fetch('/api/mobile/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: em, password: pw, fullName: fn, contactNumber: cn }),
      });
      const json = await res.json().catch(()=>null);
      if(!res.ok) throw new Error((json && json.error) ? json.error : (json && json.message) ? json.message : 'Failed to create rider');
      setOk('Rider created successfully');
      if(onCreated) onCreated();
      setTimeout(()=>{ if(onClose) onClose(); }, 600);
    }catch(e){ setError(e.message || 'Failed to create rider'); }
    finally{ setLoading(false); }
  }

  return (
    <div className="create-rider-backdrop" role="dialog" aria-modal="true">
      <div className="create-rider-modal">
        <header className="create-rider-header">
          <h3 className="create-rider-title">Create Rider</h3>
          <button className="create-rider-close" onClick={onClose} aria-label="Close">✕</button>
        </header>
        <div className="create-rider-body">
          {error && <div className="auth-error">{error}</div>}
          {ok && <div className="auth-success">{ok}</div>}
          <label className="field-label">Full name
            <input className="field-input" value={fullName} onChange={e=>setFullName(e.target.value)} required />
          </label>
          <label className="field-label">Email
            <input className="field-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </label>
          <label className="field-label">Password
            <input className="field-input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </label>
          <label className="field-label">Contact number
            <input className="field-input" type="tel" inputMode="tel" pattern="[0-9+()\-\s]{7,}" value={contactNumber} onChange={e=>setContactNumber(e.target.value)} required />
          </label>
          <div className="create-rider-actions">
            <button className="btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
            <button className="btn-primary" onClick={create} disabled={loading}>{loading ? 'Creating…' : 'Create'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
