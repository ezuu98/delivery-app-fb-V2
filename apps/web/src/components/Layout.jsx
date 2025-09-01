import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider.jsx';
import '../styles/ui.css';

export default function Layout() {
  const { signOut } = useAuth();
  return (
    <div className="layout-shell">
      <header className="topbar">
        <div className="brand-area">
          <span className="brand-mark" aria-hidden>■</span>
          <span className="brand-name">SwiftShip</span>
        </div>
        <nav className="main-nav" aria-label="Primary">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
          <NavLink to="/orders" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Orders</NavLink>
          <NavLink to="/riders" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Riders</NavLink>
          <NavLink to="/customers" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Customers</NavLink>
          <NavLink to="/reports" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Reports</NavLink>
        </nav>
        <div className="topbar-actions">
          <div className="search-chip" aria-label="Search"><span aria-hidden>🔍</span><span className="chip-text">Search</span></div>
          <button className="icon-button" aria-label="Notifications">🔔</button>
          <div className="avatar">SC</div>
          <button className="ghost-btn" onClick={signOut}>Sign out</button>
        </div>
      </header>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}
