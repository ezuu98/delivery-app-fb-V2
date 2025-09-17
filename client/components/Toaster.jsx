import React, { useEffect, useState } from 'react';

export default function Toaster(){
  const [toasts, setToasts] = useState([]);

  useEffect(()=>{
    // expose a simple global API for quick notifications
    window.showToast = function(message, opts = {}){
      const id = String(Date.now()) + Math.random().toString(36).slice(2,8);
      const toast = { id, message: String(message || ''), type: opts.type || 'success', ttl: typeof opts.ttl === 'number' ? opts.ttl : 4000 };
      setToasts(t => [toast, ...t]);
      return id;
    };
    window.hideToast = function(id){ setToasts(t => t.filter(x => x.id !== id)); };
    return ()=>{
      try{ delete window.showToast; delete window.hideToast; }catch(_){}
    };
  },[]);

  useEffect(()=>{
    if(!toasts.length) return;
    const timers = toasts.map(t => {
      return setTimeout(()=>{ setToasts(curr => curr.filter(x => x.id !== t.id)); }, t.ttl);
    });
    return ()=>{ timers.forEach(clearTimeout); };
  },[toasts]);

  if(!toasts.length) return null;
  return (
    <div className="toaster-container" aria-live="polite" aria-atomic="true">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type === 'success' ? 'toast-success' : 'toast-info'}`} role="status">
          <div className="toast-message">{t.message}</div>
          <button className="toast-close" onClick={()=>setToasts(curr => curr.filter(x => x.id !== t.id))} aria-label="Dismiss">✕</button>
        </div>
      ))}
    </div>
  );
}
