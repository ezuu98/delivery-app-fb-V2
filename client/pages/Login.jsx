import React, { useEffect, useState } from 'react';

export default function Login(){
  const [cfg, setCfg] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(()=>{
    // config is embedded by server via env; fallback to window.__FIREBASE__ if present
    setCfg({
      apiKey: import.meta.env.FIREBASE_API_KEY,
      authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.FIREBASE_PROJECT_ID,
      appId: import.meta.env.FIREBASE_APP_ID,
      messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
      measurementId: import.meta.env.FIREBASE_MEASUREMENT_ID,
    });
  },[]);

  function mapError(e){
    const code = e?.code || '';
    const msg = e?.message || '';
    if(code.includes('invalid-email')) return 'Please enter a valid email address.';
    if(code.includes('user-not-found')) return 'No account found with that email.';
    if(code.includes('wrong-password')) return 'Incorrect email or password.';
    if(code.includes('invalid-credential') || msg.includes('INVALID_LOGIN_CREDENTIALS')) return 'Incorrect email or password.';
    if(code.includes('too-many-requests')) return 'Too many attempts. Please wait and try again.';
    if(code.includes('network-request-failed')) return 'Network error. Check your connection and try again.';
    return msg || 'Something went wrong.';
  }

  async function onSubmit(e){
    e.preventDefault(); setError(''); setOk(''); setLoading(true);
    try{
      if(!cfg?.apiKey) throw new Error('Firebase not configured');
      const app = (await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js')).initializeApp(cfg);
      const authMod = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js');
      const { getAuth, setPersistence, browserLocalPersistence, browserSessionPersistence, signInWithEmailAndPassword } = authMod;
      const auth = getAuth();
      await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const idToken = await cred.user.getIdToken();
      const res = await fetch('/auth/session', { method:'POST', headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify({ idToken }) });
      if(!res.ok) throw new Error('Session creation failed');
      setOk('Signed in successfully. Redirecting...');
      setTimeout(()=> window.location.href = '/riders', 600);
    }catch(e){ setError(mapError(e)); }
    finally{ setLoading(false); }
  }

  async function onForgot(){
    setError(''); setOk('');
    try{
      if(!cfg?.apiKey) throw new Error('Firebase not configured');
      const app = (await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js')).initializeApp(cfg);
      const { getAuth, sendPasswordResetEmail } = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js');
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email.trim());
      setOk('If an account exists for that email, a reset link has been sent.');
    }catch(e){ setError(mapError(e)); }
  }

  return (
    <section className="auth-layout">
      <div className="auth-hero">
        <img className="hero-logo" src="https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2F240094ac7d6b4725b685503d97c9d9a3?format=webp&width=96" alt="FreshBasket logo" />
        <h2 className="hero-heading">Welcome back</h2>
        <p className="hero-sub">Sign in to manage orders, riders and deliveries.</p>
        <ul className="hero-points"><li>Secure account access</li><li>Real-time dashboards</li><li>Faster operations</li></ul>
      </div>

      <div className="auth-panel auth-panel-card">
        <h2 className="auth-title">Sign in to FreshBasket</h2>
        {error && <div className="auth-error">{error}</div>}
        {ok && <div className="auth-success">{ok}</div>}
        <form className="auth-form" onSubmit={onSubmit}>
          <label className="auth-label">Email
            <input className="auth-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </label>
          <label className="auth-label">Password
            <span className="password-field">
              <input className="auth-input" type={show?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} required />
              <button type="button" id="togglePwd" className="toggle-password" aria-label={show?'Hide password':'Show password'} onClick={()=>setShow(s=>!s)}>👁️</button>
            </span>
          </label>
          <div className="auth-actions">
            <label className="remember"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} /> Remember me</label>
            <button className="link-button" type="button" onClick={onForgot}>Forgot password?</button>
          </div>
          <button className="auth-button auth-button-wide" disabled={loading} type="submit">{loading?'Signing in…':'Sign in'}</button>
        </form>
        <p className="auth-alt">No account? <a href="/auth/register">Register</a></p>
      </div>
    </section>
  );
}
