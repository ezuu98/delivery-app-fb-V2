import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase.js';
import '../styles/auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState('login');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage('Logged in');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage('Account created');
      }
      window.location.assign('/orders');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand-header">
          <div className="brand-logo" aria-hidden="true">🔒</div>
          <h1 className="brand-title">{mode === 'login' ? 'Welcome back' : 'Create account'}</h1>
          <p className="brand-subtitle">{mode === 'login' ? 'Sign in to continue' : 'Sign up to get started'}</p>
        </div>

        {error && <div className="error-banner" role="alert">{error}</div>}
        {message && <div className="success-banner" role="status">{message}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="field-label" htmlFor="email">Email</label>
            <input id="email" type="email" className="input-field" placeholder="you@example.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-row">
            <label className="field-label" htmlFor="password">Password</label>
            <input id="password" type="password" className="input-field" placeholder="••••••••" autoComplete={mode==='login'?'current-password':'new-password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? (mode==='login'?'Signing in…':'Creating…') : (mode==='login'?'Sign in':'Create account')}
          </button>
        </form>

        <div className="aux-links">
          <a className="muted-link" href="#" onClick={(e) => { e.preventDefault(); setMode(mode==='login'?'signup':'login'); }}>{mode==='login'?'Create account':'Have an account? Sign in'}</a>
        </div>
      </div>
    </div>
  );
}
