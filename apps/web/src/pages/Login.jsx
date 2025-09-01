import React, { useMemo, useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, RecaptchaVerifier, signInWithPhoneNumber, updateProfile, sendEmailVerification, linkWithPhoneNumber } from 'firebase/auth';
import { auth } from '../lib/firebase.js';
import '../styles/auth.css';

export default function Login() {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState('login'); // login | signup | reset | otp
  const [confirmation, setConfirmation] = useState(null);
  const [verifyNotice, setVerifyNotice] = useState(false);
  const [resendBusy, setResendBusy] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [otpRedirectTo, setOtpRedirectTo] = useState(null);

  const title = useMemo(() => ({
    login: 'Welcome back',
    signup: 'Create account',
    reset: 'Reset password',
    otp: 'Sign in with OTP'
  })[mode], [mode]);

  const validators = {
    fullName: (v) => !v || v.trim().length < 2 ? 'Enter your full name' : undefined,
    address: (v) => !v || v.trim().length < 5 ? 'Enter a valid address' : undefined,
    email: (v) => /.+@.+\..+/.test(v) ? undefined : 'Enter a valid email',
    password: (v) => /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v) ? undefined : 'Min 8 chars with letters and numbers',
    phone: (v) => /^\+?[0-9]{7,15}$/.test((v||'').replace(/\s+/g,'')) ? undefined : 'Enter a valid phone (E.164)',
    otp: (v) => /^\d{6}$/.test(v) ? undefined : 'Enter the 6-digit code',
  };

  function validateFor(modeToValidate) {
    const errs = {};
    if (modeToValidate === 'signup') {
      errs.fullName = validators.fullName(fullName);
      errs.phone = validators.phone(phone);
      errs.address = validators.address(address);
      errs.email = validators.email(email);
      errs.password = validators.password(password);
    } else if (modeToValidate === 'login') {
      errs.email = validators.email(email);
      errs.password = password ? undefined : 'Password required';
    } else if (modeToValidate === 'reset') {
      errs.email = validators.email(email);
    } else if (modeToValidate === 'otp') {
      errs.phone = validators.phone(phone);
      if (confirmation) errs.otp = validators.otp(otp);
    }
    Object.keys(errs).forEach(k => errs[k] === undefined && delete errs[k]);
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function startOtpFlow({ linkToUser = false, user = null, phoneNumber }) {
    setMode('otp');
    setConfirmation(null);
    setTimeout(async () => {
      try {
        if (!window._recaptchaVerifier) {
          window._recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
        }
        const conf = linkToUser && user
          ? await linkWithPhoneNumber(user, phoneNumber, window._recaptchaVerifier)
          : await signInWithPhoneNumber(auth, phoneNumber, window._recaptchaVerifier);
        setConfirmation(conf);
        setMessage('Code sent');
      } catch (e) { setError(e.message); }
    }, 0);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      if (!validateFor(mode)) { setLoading(false); setError('Please fix the highlighted fields'); return; }
      if (mode === 'login') {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        if (!cred.user.emailVerified) {
          await sendEmailVerification(cred.user);
          setVerifyNotice(true);
          setMessage('Verification email sent. Please verify to continue.');
          setError('');
          await auth.signOut();
          return;
        }
        window.location.assign('/orders');
      } else if (mode === 'signup') {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (cred?.user && fullName) {
          await updateProfile(cred.user, { displayName: fullName });
        }
        await sendEmailVerification(cred.user);
        try { localStorage.setItem('profileDraft', JSON.stringify({ fullName, address, phone })); } catch {}
        setVerifyNotice(true);
        setMessage('Check your email for verification. We also sent an SMS code.');
        await startOtpFlow({ linkToUser: true, user: cred.user, phoneNumber: phone });
        return;
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
          setMessage('Phone verified. Verify your email, then sign in.');
          setVerifyNotice(true);
          await auth.signOut();
          setMode('login');
          setConfirmation(null);
          setOtp('');
          return;
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function resendVerification() {
    if (!email) return;
    setResendBusy(true);
    setError('');
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password).catch(()=>null);
      if (cred?.user) {
        await sendEmailVerification(cred.user);
        await auth.signOut();
        setMessage('Verification email resent.');
      } else {
        setError('Enter the same email and password, then press Resend.');
      }
    } catch (e) { setError(e.message); } finally { setResendBusy(false); }
  }

  return (
    <div className="auth-page">
      <div className="auth-grid">
        <div className="auth-card auth-panel">
          <div className="brand-header">
            <div className="brand-logo" aria-hidden="true">🔒</div>
            <h1 className="brand-title">{title}</h1>
            <p className="brand-subtitle">{mode === 'login' && 'Sign in to continue'}{mode === 'signup' && 'Sign up to get started'}{mode === 'reset' && 'We will email you a reset link'}{mode === 'otp' && 'Verify with your phone number'}</p>
          </div>

          <div className="auth-tabs" role="tablist" aria-label="Sign in method">
            <button className={mode==='login' ? 'auth-tab active' : 'auth-tab'} onClick={()=>{setMode('login'); setMessage(''); setError('');}} role="tab" aria-selected={mode==='login'}>Sign in</button>
            <button className={mode==='otp' ? 'auth-tab active' : 'auth-tab'} onClick={()=>{setMode('otp'); setMessage(''); setError(''); setOtpRedirectTo(null);}} role="tab" aria-selected={mode==='otp'}>OTP</button>
          </div>

          {verifyNotice && (
            <div className="success-banner" role="status">Please verify your email. Didn't get it? <a className="link" href="#" onClick={(e)=>{e.preventDefault(); resendVerification();}}>{resendBusy ? 'Resending…' : 'Resend'}</a></div>
          )}
          {error && <div className="error-banner" role="alert">{error}</div>}
          {message && <div className="success-banner" role="status">{message}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            {(mode === 'login' || mode === 'signup' || mode === 'reset') && (
              <>
                {mode === 'signup' && (
                  <>
                    <div className="form-row">
                      <label className="field-label" htmlFor="fullName">Full name</label>
                      <input id="fullName" className={fieldErrors.fullName? 'input-field input-invalid':'input-field'} placeholder="Your name" value={fullName} onChange={(e)=>setFullName(e.target.value)} />
                      {fieldErrors.fullName && <div className="field-error">{fieldErrors.fullName}</div>}
                    </div>
                    <div className="form-row">
                      <label className="field-label" htmlFor="signupPhone">Phone</label>
                      <input id="signupPhone" type="tel" className={fieldErrors.phone? 'input-field input-invalid':'input-field'} placeholder="+1 555 123 4567" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                      {fieldErrors.phone && <div className="field-error">{fieldErrors.phone}</div>}
                    </div>
                    <div className="form-row">
                      <label className="field-label" htmlFor="address">Address</label>
                      <input id="address" className={fieldErrors.address? 'input-field input-invalid':'input-field'} placeholder="123 Main St, City" value={address} onChange={(e)=>setAddress(e.target.value)} />
                      {fieldErrors.address && <div className="field-error">{fieldErrors.address}</div>}
                    </div>
                  </>
                )}
                <div className="form-row">
                  <label className="field-label" htmlFor="email">Email</label>
                  <input id="email" type="email" className={fieldErrors.email? 'input-field input-invalid':'input-field'} placeholder="you@example.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  {fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}
                </div>
                {mode !== 'reset' && (
                  <div className="form-row password-row">
                    <label className="field-label" htmlFor="password">Password</label>
                    <input id="password" type={showPassword? 'text':'password'} className={fieldErrors.password? 'input-field input-invalid':'input-field'} placeholder="••••••••" autoComplete={mode==='login'?'current-password':'new-password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="visibility-toggle" aria-label={showPassword? 'Hide password':'Show password'} type="button" onClick={()=>setShowPassword(v=>!v)}>{showPassword? '🙈':'👁️'}</button>
                    {fieldErrors.password && <div className="field-error">{fieldErrors.password}</div>}
                  </div>
                )}
              </>
            )}

            {mode === 'login' && (
              <div className="form-actions">
                <label className="form-checkbox"><input type="checkbox" checked={remember} onChange={(e)=>setRemember(e.target.checked)} /> Remember me</label>
                <a className="muted-link" href="#" onClick={(e)=>{e.preventDefault(); setMode('reset');}}>Forgot password?</a>
              </div>
            )}

            {mode === 'otp' && (
              <>
                <div className="form-row">
                  <label className="field-label" htmlFor="phone">Phone number</label>
                  <input id="phone" type="tel" className={fieldErrors.phone? 'input-field input-invalid':'input-field'} placeholder="+1 555 123 4567" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                  {fieldErrors.phone && <div className="field-error">{fieldErrors.phone}</div>}
                </div>
                {confirmation && (
                  <div className="form-row">
                    <label className="field-label" htmlFor="otp">Enter code</label>
                    <input id="otp" type="text" inputMode="numeric" pattern="[0-9]*" className={fieldErrors.otp? 'input-field input-invalid':'input-field'} placeholder="123456" value={otp} onChange={(e)=>setOtp(e.target.value)} />
                    {fieldErrors.otp && <div className="field-error">{fieldErrors.otp}</div>}
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

            {mode === 'login' && (
              <div className="aux-links" style={{marginTop: '8px'}}>
                <a className="muted-link" href="#" onClick={(e)=>{e.preventDefault(); setOtpRedirectTo('login'); setMode('otp'); setMessage('Verify your phone to continue');}}>Create account</a>
              </div>
            )}
          </form>

          <div className="aux-links">
            {mode !== 'login' && <a className="muted-link" href="#" onClick={(e) => { e.preventDefault(); setMode('login'); setMessage(''); setError(''); }}>Back to sign in</a>}
          </div>
        </div>
      </div>
    </div>
  );
}
