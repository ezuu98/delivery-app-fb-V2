import React, { useState } from 'react';

export default function CreatePackerModal({ onClose, onCreated }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [fullNameErr, setFullNameErr] = useState(false);
  const [contactErr, setContactErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function create(){
    setError(''); setOk(''); setSubmitted(true);
    const em = String(email).trim();
    const pw = String(password);
    const fn = String(fullName).trim();
    const cn = String(contactNumber).trim();
    const digits = cn.replace(/\D+/g, '');
    const missing = { fn: !fn, cn: !cn, pw: !pw };
    setFullNameErr(missing.fn);
    setContactErr(missing.cn || digits.length < 7);
    setPasswordErr(missing.pw);
    if(missing.fn || missing.cn || missing.pw){ setError('Full name, mobile and password are required'); return; }
    if(digits.length < 7){ setError('Please enter a valid mobile number'); setContactErr(true); return; }
    if(em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){ setError('Please enter a valid email'); return; }
    if(pw.length < 6){ setPasswordErr(true); setError('Password must be at least 6 characters'); return; }

    setLoading(true);
    try{
      const res = await fetch('/api/packers', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: em, password: pw, fullName: fn, contactNumber: cn }),
      });
      const json = await res.json().catch(()=>null);
      if(!res.ok){
        const raw = String((json && (json.error || json.message)) || '');
        const msg = raw.toUpperCase();
        if(/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(raw) || /MISSING\s*EMAIL\/PASSWORD/i.test(raw)){
          setError('Full name, mobile and password are required');
          setFullNameErr(!fn);
          setContactErr(!cn || digits.length < 7);
          setPasswordErr(!pw);
        } else if (msg.includes('EMAIL_EXISTS')) {
          setError('An account with this email already exists. Use a different email or leave email blank.');
        } else if (msg.includes('INVALID_EMAIL')) {
          setError('Please enter a valid email');
        } else if (msg.includes('WEAK_PASSWORD') || /AT LEAST 6 CHARACTERS/i.test(raw)) {
          setPasswordErr(true);
          setError('Password must be at least 6 characters');
        } else if (/INVALID CONTACT NUMBER/i.test(raw)) {
          setContactErr(true);
          setError('Please enter a valid mobile number');
        } else if (/FIREBASE NOT CONFIGURED/i.test(raw)) {
          setError('Service temporarily unavailable. Please try again later.');
        } else {
          throw new Error(raw || 'Failed to create packer');
        }
        return;
      }
      setOk('Packer created successfully');
      if(onCreated) onCreated();
      setTimeout(()=>{ if(onClose) onClose(); }, 600);
    }catch(e){
      const m = String(e?.message||'');
      if(/Missing\s*(fullName\/contactNumber|email\/password)/i.test(m)){
        setError('Full name, mobile and password are required');
      } else if(/EMAIL_EXISTS/i.test(m)){
        setError('An account with this email already exists. Use a different email or leave email blank.');
      } else if(/INVALID_EMAIL/i.test(m)){
        setError('Please enter a valid email');
      } else if(/WEAK_PASSWORD/i.test(m) || /AT LEAST 6 CHARACTERS/i.test(m)){
        setPasswordErr(true);
        setError('Password must be at least 6 characters');
      } else if(/INVALID CONTACT NUMBER/i.test(m)){
        setContactErr(true);
        setError('Please enter a valid mobile number');
      } else {
        setError(m || 'Failed to create packer');
      }
    }
    finally{ setLoading(false); }
  }

  return (
    <div className="create-rider-backdrop" role="dialog" aria-modal="true">
      <div className="create-rider-modal">
        <header className="create-rider-header">
          <h3 className="create-rider-title">Create Packer</h3>
          <button className="create-rider-close" onClick={onClose} aria-label="Close">✕</button>
        </header>
        <div className="create-rider-body">
          {ok && <div className="auth-success">{ok}</div>}
          <label className="field-label">Full name
            <input className={"field-input" + (submitted && (!String(fullName).trim()) ? ' input-error' : '')} value={fullName} onChange={e=>{ setFullName(e.target.value); if(submitted) setFullNameErr(!String(e.target.value).trim()); }} required />
          </label>
          <label className="field-label">Email
            <input className="field-input" type="email" value={email} onChange={e=>{ setEmail(e.target.value); }} />
          </label>
          <label className="field-label">Password
            <input className={"field-input" + (submitted && (!String(password)) ? ' input-error' : '')} type="password" value={password} onChange={e=>{ setPassword(e.target.value); if(submitted) setPasswordErr(!String(e.target.value)); }} required />
          </label>
          <label className="field-label">Contact number
            <input className={"field-input" + (submitted && ((String(contactNumber).trim().replace(/\D+/g,'').length < 7)) ? ' input-error' : '')} type="tel" inputMode="tel" pattern="[0-9+()\-\s]{7,}" value={contactNumber} onChange={e=>{ setContactNumber(e.target.value); if(submitted){ const digits = String(e.target.value).trim().replace(/\D+/g,''); setContactErr(!(digits.length >= 7)); } }} required />
          </label>
          {error && <div className="auth-error">{error}</div>}
          <div className="create-rider-actions">
            <button className="btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
            <button className="btn-primary" onClick={create} disabled={loading}>{loading ? 'Creating…' : 'Create'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
