import React, { useMemo, useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, RecaptchaVerifier, signInWithPhoneNumber, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase.js';
import '../styles/auth.css';

export default function Login() {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState('signup'); // login | signup | reset | otp
  const [confirmation, setConfirmation] = useState(null);

  const title = useMemo(() => ({
    login: 'Welcome back',
    signup: 'Create account',
    reset: 'Reset password',
    otp: 'Sign in with OTP'
  })[mode], [mode]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.assign('/orders');
      } else if (mode === 'signup') {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (cred?.user && fullName) {
          await updateProfile(cred.user, { displayName: fullName });
        }
        try { localStorage.setItem('profileDraft', JSON.stringify({ fullName, address, phone })); } catch {}
        setMessage('Account created');
        window.location.assign('/orders');
      } else if (mode === 'reset') {
        await sendPasswordResetEmail(auth, email);
        setMessage('Password reset email sent');
      } else if (mode === 'otp') {
        if (!confirmation) {
          if (!window._recaptchaVerifier) {
            window._recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
          }
          const conf = await signInWithPhoneNumber(auth, phone, window._recaptchaVerifier);
          setConfirmation(conf);
          setMessage('Code sent');
        } else {
          await confirmation.confirm(otp);
          window.location.assign('/orders');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-grid">
        <aside className="auth-hero">
          <div className="hero-badge">SwiftShip</div>
          <h2 className="hero-title">Fast, reliable delivery ops</h2>
          <p className="hero-copy">Manage orders, track riders, and analyze performance in one dashboard.</p>
          <ul className="hero-list">
            <li>Secure account access</li>
            <li>Real-time order updates</li>
            <li>Actionable analytics</li>
          </ul>
        </aside>

        <div className="auth-card auth-panel">
          <div className="brand-header">
            <div className="brand-logo" aria-hidden="true">🔒</div>
            <h1 className="brand-title">{title}</h1>
            <p className="brand-subtitle">{mode === 'login' && 'Sign in to continue'}{mode === 'signup' && 'Sign up to get started'}{mode === 'reset' && 'We will email you a reset link'}{mode === 'otp' && 'Verify with your phone number'}</p>
          </div>

          <div className="auth-tabs" role="tablist" aria-label="Sign in method">
            <button className={mode==='login' ? 'auth-tab active' : 'auth-tab'} onClick={()=>{setMode('login'); setMessage(''); setError('');}} role="tab" aria-selected={mode==='login'}>Email</button>
            <button className={mode==='signup' ? 'auth-tab active' : 'auth-tab'} onClick={()=>{setMode('signup'); setMessage(''); setError('');}} role="tab" aria-selected={mode==='signup'}>Sign up</button>
            <button className={mode==='otp' ? 'auth-tab active' : 'auth-tab'} onClick={()=>{setMode('otp'); setMessage(''); setError('');}} role="tab" aria-selected={mode==='otp'}>OTP</button>
          </div>

          {error && <div className="error-banner" role="alert">{error}</div>}
          {message && <div className="success-banner" role="status">{message}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            {(mode === 'login' || mode === 'signup' || mode === 'reset') && (
              <>
                <div className="form-row">
                  <label className="field-label" htmlFor="email">Email</label>
                  <input id="email" type="email" className="input-field" placeholder="you@example.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                {mode !== 'reset' && (
                  <div className="form-row">
                    <label className="field-label" htmlFor="password">Password</label>
                    <input id="password" type="password" className="input-field" placeholder="••••••••" autoComplete={mode==='login'?'current-password':'new-password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                )}
              </>
            )}

            {mode === 'otp' && (
              <>
                <div className="form-row">
                  <label className="field-label" htmlFor="phone">Phone number</label>
                  <input id="phone" type="tel" className="input-field" placeholder="+1 555 123 4567" value={phone} onChange={(e)=>setPhone(e.target.value)} required />
                </div>
                {confirmation && (
                  <div className="form-row">
                    <label className="field-label" htmlFor="otp">Enter code</label>
                    <input id="otp" type="text" inputMode="numeric" pattern="[0-9]*" className="input-field" placeholder="123456" value={otp} onChange={(e)=>setOtp(e.target.value)} required />
                  </div>
                )}
                <div id="recaptcha-container" />
              </>
            )}

            <button className="submit-button" type="submit" disabled={loading}>
              {loading ?
                (mode==='login'?'Signing in…': mode==='signup'?'Creating…': mode==='reset'?'Sending…': confirmation?'Verifying…':'Send code')
                :
                (mode==='login'?'Sign in': mode==='signup'?'Create account': mode==='reset'?'Send reset link': confirmation?'Verify code':'Send code')
              }
            </button>
          </form>

          <div className="aux-links">
            {mode !== 'reset' && <a className="muted-link" href="#" onClick={(e) => { e.preventDefault(); setMode('reset'); setMessage(''); setError(''); }}>Forgot password?</a>}
          </div>
        </div>
      </div>
    </div>
  );
}
