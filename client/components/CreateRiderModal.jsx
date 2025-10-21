import React, { useState } from 'react';

export default function CreateRiderModal({ onClose, onCreated }){
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

  const COUNTRY_CODE = '+92';

  function formatPhoneNumber(value){
    const digits = String(value || '').replace(/\D+/g, '');
    if (digits.length === 0) return '';
    if (digits.startsWith('92')) {
      return COUNTRY_CODE + digits.slice(2);
    }
    return COUNTRY_CODE + digits;
  }

  const displayPhoneNumber = formatPhoneNumber(contactNumber);

  async function create(){
    setError(''); setOk(''); setSubmitted(true);
    const pw = String(password);
    const fn = String(fullName).trim();
    const cn = String(contactNumber).trim();
    const digits = cn.replace(/\D+/g, '');
    const missing = { fn: !fn, cn: !cn, pw: !pw };
    setFullNameErr(missing.fn);
    setContactErr(missing.cn || digits.length < 7);
    setPasswordErr(missing.pw);
    if(missing.fn || missing.cn || missing.pw){ setError('Full name, mobile and password are required'); return; }
    if(digits.length !== 10){ setError('numbers should be 10 digit'); setContactErr(true); return; }
    if(pw.length < 6){ setPasswordErr(true); setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    try{
      const formattedPhone = formatPhoneNumber(cn);
      const res = await fetch('/api/mobile/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw, fullName: fn, contactNumber: formattedPhone }),
      });
      const json = await res.json().catch(()=>null);
      if(!res.ok){
        const raw = String((json && (json.error || json.message)) || '');
        const msg = raw.toUpperCase();
        if(/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(raw) || /MISSING\s*PASSWORD/i.test(raw)){
          setError('Full name, mobile and password are required');
          setFullNameErr(!fn);
          setContactErr(!cn || digits.length !== 10);
          setPasswordErr(!pw);
        } else if (msg.includes('WEAK_PASSWORD') || /AT LEAST 6 CHARACTERS/i.test(raw)) {
          setPasswordErr(true);
          setError('Password must be at least 6 characters');
        } else if (/INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(raw)) {
          setContactErr(true);
          setError('numbers should be 10 digit');
        } else if (/FIREBASE NOT CONFIGURED/i.test(raw)) {
          setError('Service temporarily unavailable. Please try again later.');
        } else if (raw) {
          setError(raw);
        } else {
          setError('Failed to create rider');
        }
        return;
      }
      setOk('Rider created successfully');
      if(onCreated) onCreated();
      setTimeout(()=>{ if(onClose) onClose(); }, 600);
    }catch(e){
      const m = String(e?.message||'');
      if(/Missing\s*(fullName\/contactNumber|password)/i.test(m)){
        setError('Full name, mobile and password are required');
      } else if(/WEAK_PASSWORD/i.test(m) || /AT LEAST 6 CHARACTERS/i.test(m)){
        setPasswordErr(true);
        setError('Password must be at least 6 characters');
      } else if(/INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(m)){
        setContactErr(true);
        setError('numbers should be 10 digit');
      } else if (m) {
        setError(m);
      } else {
        setError('Failed to create rider');
      }
    }
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
            <input className={"field-input" + (submitted && (!String(fullName).trim()) ? ' input-error' : '')} value={fullName} onChange={e=>{ setFullName(e.target.value); if(submitted) setFullNameErr(!String(e.target.value).trim()); }} required />
          </label>
          <label className="field-label">Password
            <input className={"field-input" + (submitted && (!String(password)) ? ' input-error' : '')} type="password" value={password} onChange={e=>{ setPassword(e.target.value); if(submitted) setPasswordErr(!String(e.target.value)); }} required />
          </label>
          <label className="field-label">Contact number
            <div className="phone-input-wrapper">
              <span className="phone-prefix">+92</span>
              <input
                className={"field-input phone-input-field" + (submitted && ((String(contactNumber).trim().replace(/\D+/g,'').length !== 10)) ? ' input-error' : '')}
                type="tel"
                inputMode="tel"
                pattern="[0-9]{10}"
                placeholder="3001234567"
                value={contactNumber}
                onChange={e=>{
                  const val = e.target.value.replace(/\D+/g, '').slice(0, 10);
                  setContactNumber(val);
                  if(submitted){
                    setContactErr(!(val.length === 10));
                  }
                }}
                required
              />
            </div>
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
