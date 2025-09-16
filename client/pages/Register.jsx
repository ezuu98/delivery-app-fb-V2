import React, { useEffect, useState } from 'react';

export default function Register(){
  const [cfg, setCfg] = useState(null);
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(()=>{
    const w = typeof window !== 'undefined' ? window : undefined;
    const wc = w && w.__FIREBASE__ ? w.__FIREBASE__ : null;
    setCfg({
      apiKey: (wc && wc.apiKey) || import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.FIREBASE_API_KEY,
      authDomain: (wc && wc.authDomain) || import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || import.meta.env.FIREBASE_AUTH_DOMAIN,
      projectId: (wc && wc.projectId) || import.meta.env.VITE_FIREBASE_PROJECT_ID || import.meta.env.FIREBASE_PROJECT_ID,
      appId: (wc && wc.appId) || import.meta.env.VITE_FIREBASE_APP_ID || import.meta.env.FIREBASE_APP_ID,
      messagingSenderId: (wc && wc.messagingSenderId) || import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
      measurementId: (wc && wc.measurementId) || import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || import.meta.env.FIREBASE_MEASUREMENT_ID,
    });
  },[]);

  function mapError(e){
    const code = e?.code || '';
    if(code.includes('email-already-in-use')) return 'An account with this email already exists.';
    if(code.includes('weak-password')) return 'Password should be at least 6 characters.';
    if(code.includes('invalid-email')) return 'Please enter a valid email address.';
    if(code.includes('network-request-failed')) return 'Network error. Check your connection and try again.';
    return e?.message || 'Something went wrong.';
  }

  async function onSubmit(e){
    e.preventDefault(); setError(''); setOk(''); setLoading(true);
    try{
      if(password !== confirm) throw new Error('Passwords do not match');
      if(!cfg?.apiKey) throw new Error('Firebase not configured');
      const app = (await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js')).initializeApp(cfg);
      const { getAuth, createUserWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js');
      const auth = getAuth();
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const idToken = await cred.user.getIdToken();
      const res = await fetch('/auth/session', { method:'POST', headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify({ idToken, profile:{ fullName, contactNumber } }) });
      if(!res.ok) throw new Error('Session creation failed');
      setOk('Account created successfully. Redirecting...');
      setTimeout(()=> window.location.href = '/riders', 700);
    }catch(e){ setError(mapError(e)); }
    finally{ setLoading(false); }
  }

  return (
    <section className="auth-panel" style={{maxWidth:520, margin:'40px auto'}}>
      <h2 className="auth-title">Register</h2>
      {error && <div className="auth-error">{error}</div>}
      {ok && <div className="auth-success">{ok}</div>}
      <form className="auth-form" onSubmit={onSubmit}>
        <label className="auth-label">Full name
          <input className="auth-input" value={fullName} onChange={e=>setFullName(e.target.value)} required />
        </label>
        <label className="auth-label">Contact number
          <input className="auth-input" value={contactNumber} onChange={e=>setContactNumber(e.target.value)} inputMode="tel" placeholder="e.g. +1 555 123 4567" />
        </label>
        <label className="auth-label">Email
          <input className="auth-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>
        <label className="auth-label">Password
          <span className="password-field">
            <input className="auth-input" type={show?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} minLength={6} required />
            <button type="button" className="toggle-password" aria-label={show?'Hide password':'Show password'} onClick={()=>setShow(s=>!s)}>👁️</button>
          </span>
        </label>
        <label className="auth-label">Confirm Password
          <input className="auth-input" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} minLength={6} required />
        </label>
        <button className="auth-button" disabled={loading} type="submit">{loading?'Creating account…':'Create account'}</button>
      </form>
      <p className="auth-alt">Have an account? <a href="/auth/login">Login</a></p>
    </section>
  );
}
