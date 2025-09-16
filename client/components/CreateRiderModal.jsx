import React, { useState } from 'react';

export default function CreateRiderModal({ onClose, onCreated }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [fullNameErr, setFullNameErr] = useState(false);
  const [contactErr, setContactErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  async function create(){
    setError(''); setOk('');
    const em = String(email).trim();
    const pw = String(password);
    const fn = String(fullName).trim();
    const cn = String(contactNumber).trim();
    const digits = cn.replace(/\D+/g, '');
    const missing = { fn: !fn, cn: !cn, em: !em, pw: !pw };
    setFullNameErr(missing.fn);
    setContactErr(missing.cn || digits.length < 7);
    setEmailErr(missing.em);
    setPasswordErr(missing.pw);
    if(missing.fn || missing.cn || missing.em || missing.pw){ setError('Please fill in required fields'); return; }
    if(digits.length < 7){ setError('Please enter a valid mobile number'); setContactErr(true); return; }
    setLoading(true);
    try{
      const res = await fetch('/api/mobile/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: em, password: pw, fullName: fn, contactNumber: cn }),
      });
      const json = await res.json().catch(()=>null);
      if(!res.ok){
        const msg = (json && (json.error || json.message)) || '';
        if(/Missing\s*fullName\/contactNumber/i.test(String(msg))){
          setError('Please fill in required fields');
          setFullNameErr(!fn);
          setContactErr(!cn || digits.length < 7);
        } else {
          throw new Error(msg || 'Failed to create rider');
        }
        return;
      }
      setOk('Rider created successfully');
      if(onCreated) onCreated();
      setTimeout(()=>{ if(onClose) onClose(); }, 600);
    }catch(e){ if(!/Missing\s*fullName\/contactNumber/i.test(String(e?.message||''))) setError(e.message || 'Failed to create rider'); }
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
          {ok && <div className="auth-success">{ok}</div>}
          <label className="field-label">Full name
            <input className={"field-input" + (fullNameErr && !String(fullName).trim() ? ' input-error' : '')} value={fullName} onChange={e=>{ setFullName(e.target.value); if(fullNameErr) setFullNameErr(!String(e.target.value).trim()); }} onBlur={()=> setFullNameErr(!String(fullName).trim())} required />
          </label>
          <label className="field-label">Email
            <input className={"field-input" + (emailErr && !String(email).trim() ? ' input-error' : '')} type="email" value={email} onChange={e=>{ setEmail(e.target.value); if(emailErr) setEmailErr(!String(e.target.value).trim()); }} onBlur={()=> setEmailErr(!String(email).trim())} required />
          </label>
          <label className="field-label">Password
            <input className={"field-input" + (passwordErr && !String(password) ? ' input-error' : '')} type="password" value={password} onChange={e=>{ setPassword(e.target.value); if(passwordErr) setPasswordErr(!String(e.target.value)); }} onBlur={()=> setPasswordErr(!String(password))} required />
          </label>
          <label className="field-label">Contact number
            <input className={"field-input" + (contactErr ? ' input-error' : '')} type="tel" inputMode="tel" pattern="[0-9+()\-\s]{7,}" value={contactNumber} onChange={e=>{ setContactNumber(e.target.value); if(contactErr){ const digits = String(e.target.value).trim().replace(/\D+/g,''); setContactErr(!(digits.length >= 7)); } }} onBlur={()=>{ const digits = String(contactNumber).trim().replace(/\D+/g,''); setContactErr(!(digits.length >= 7)); }} required />
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
