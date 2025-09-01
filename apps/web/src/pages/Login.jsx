import React, { useState } from 'react';
import '../styles/auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || 'Login failed');
      }
      localStorage.setItem('token', data.token);
      setMessage('Logged in successfully');
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
          <h1 className="brand-title">Welcome back</h1>
          <p className="brand-subtitle">Sign in to continue</p>
        </div>

        {error && <div className="error-banner" role="alert">{error}</div>}
        {message && <div className="success-banner" role="status">{message}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="field-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input-field"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label className="field-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input-field"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="aux-links">
          <a className="muted-link" href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>
          <span className="separator" aria-hidden>•</span>
          <a className="muted-link" href="#" onClick={(e) => e.preventDefault()}>Create account</a>
        </div>
      </div>
    </div>
  );
}
