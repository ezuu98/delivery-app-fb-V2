import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toaster from './Toaster.jsx';

export default function SiteLayout({ children }){
  // Ensure a safe global showToast is available immediately so callers before Toaster mount won't fail
  useEffect(()=>{
    if (typeof window === 'undefined') return;
    window.__pendingToasts = window.__pendingToasts || [];
    if (typeof window.showToast !== 'function'){
      window.showToast = function(message, opts){
        window.__pendingToasts.push({ message, opts: opts || {} });
        return null;
      };
    }
    if (typeof window.hideToast !== 'function'){
      window.hideToast = function(id){
        // no-op until Toaster mounts
        try{ if (window.__pendingToasts) window.__pendingToasts = window.__pendingToasts.filter(t=>t.id!==id); }catch(_){}
      };
    }
  },[]);
  const navigate = useNavigate();
  useEffect(()=>{
    const notifBtn = document.getElementById('notifBtn');
    const notifMenu = document.getElementById('notifMenu');
    const profileBtn = document.getElementById('profileBtn');
    const profileMenu = document.getElementById('profileMenu');

    function setOpen(menu, btn, open){
      if(!menu) return;
      menu.classList.toggle('hidden', !open);
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      if(btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    function closeAll(){
      setOpen(notifMenu, notifBtn, false);
      setOpen(profileMenu, profileBtn, false);
    }

    function onDocClick(e){
      const isInside = (el)=> el && (el === e.target || el.contains(e.target));
      if(!isInside(notifMenu) && !isInside(notifBtn) && !isInside(profileMenu) && !isInside(profileBtn)) closeAll();
    }
    function onKey(e){ if(e.key === 'Escape') closeAll(); }

    function attachMenuInteractions(menu){
      if(!menu) return;
      menu.querySelectorAll('.dropdown-item').forEach(el=>{
        el.addEventListener('click', ()=> closeAll());
      });
    }

    if(notifBtn && notifMenu){
      notifBtn.addEventListener('click', (e)=>{ e.stopPropagation(); setOpen(profileMenu, profileBtn, false); setOpen(notifMenu, notifBtn, notifMenu.classList.contains('hidden')); });
      attachMenuInteractions(notifMenu);
    }
    if(profileBtn && profileMenu){
      profileBtn.addEventListener('click', (e)=>{ e.stopPropagation(); setOpen(notifMenu, notifBtn, false); setOpen(profileMenu, profileBtn, profileMenu.classList.contains('hidden')); });
      attachMenuInteractions(profileMenu);
    }

    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);

    return ()=>{
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  },[]);

  return (
    <>
      <header className="site-header">
        <h1 className="site-title"><span className="brand"><img className="brand-logo" src="https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2F240094ac7d6b4725b685503d97c9d9a3?format=webp&width=64" alt="FreshBasket logo" /><span className="brand-name">FreshBasket</span></span></h1>
        <nav className="site-nav">
          <Link to="/dashboard" onClick={(e)=>{ e.preventDefault(); navigate('/dashboard'); }}>Dashboard</Link>
          <Link to="/orders" onClick={(e)=>{ e.preventDefault(); navigate('/orders'); }}>Orders</Link>
          <Link to="/riders" onClick={(e)=>{ e.preventDefault(); navigate('/riders'); }}>Riders</Link>
          <span className="site-nav-spacer"></span>
          <div className="nav-dropdown">
            <button id="notifBtn" className="icon-btn" aria-haspopup="true" aria-expanded="false" aria-controls="notifMenu" aria-label="Notifications" title="Notifications">
              <svg className="bell-icon" width="29" height="29" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                  <linearGradient id="bellGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C08B3E"/>
                    <stop offset="50%" stopColor="#D4AF37"/>
                    <stop offset="100%" stopColor="#FFD700"/>
                  </linearGradient>
                </defs>
                <path fill="url(#bellGold)" d="M12 22a2 2 0 0 0 1.995-1.85L14 20h-4a2 2 0 0 0 1.85 1.995L12 22Zm8-5h-1a1 1 0 0 1-.707-.293l-.147-.147A3.99 3.99 0 0 1 17 14.172V11a5 5 0 1 0-10 0v3.172a3.99 3.99 0 0 1-1.146 2.388l-.147.147A1 1 0 0 1 5 17H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2Z"/>
              </svg>
            </button>
            <div id="notifMenu" className="dropdown-menu hidden" role="menu" aria-labelledby="notifBtn" aria-hidden="true">
              <div className="dropdown-header">Notifications</div>
              <div className="dropdown-item">No new notifications</div>
            </div>
          </div>

          <div className="nav-dropdown">
            <button id="profileBtn" className="icon-btn" aria-haspopup="true" aria-expanded="false" aria-controls="profileMenu" title="Profile">
              <svg className="avatar" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="7.5" r="3.5" stroke="currentColor" strokeWidth="1.5"/><path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
            <div id="profileMenu" className="dropdown-menu hidden" role="menu" aria-labelledby="profileBtn" aria-hidden="true">
              <div className="dropdown-header">Signed in</div>
              <Link className="dropdown-item" to="/settings" onClick={(e)=>{ e.preventDefault(); navigate('/settings'); }}>Settings</Link>
              <form method="POST" action="/auth/logout"><button className="dropdown-item" type="submit">Logout</button></form>
            </div>
          </div>
        </nav>
      </header>

      <main className="content">{children}</main>
      <footer className="site-footer">&copy; {new Date().getFullYear()} FreshBasket</footer>
      <Toaster />
    </>
  );
}
