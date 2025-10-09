import React from 'react';
import SiteLayout from '../components/SiteLayout.jsx';

export default function Settings(){
  return (
    <SiteLayout>
      <section className="rider-commissions">
        <header className="rc-header">
          <h2 className="rc-title">Settings</h2>
          <p className="rc-subtitle">Manage application preferences.</p>
        </header>
        <div className="rc-table-wrapper">
          <div className="section-note">Settings page</div>
        </div>
      </section>
    </SiteLayout>
  );
}
