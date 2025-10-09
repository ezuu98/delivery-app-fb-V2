import React, { useEffect, useState } from 'react';
import SiteLayout from '../components/SiteLayout.jsx';

const STORAGE_KEY = 'app.settings.fares';

export default function Settings(){
  const [baseFare, setBaseFare] = useState(0);
  const [farePerKm, setFarePerKm] = useState(2);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw){
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object'){
          if (parsed.baseFare !== undefined && Number.isFinite(Number(parsed.baseFare))) setBaseFare(Number(parsed.baseFare));
          if (parsed.farePerKm !== undefined && Number.isFinite(Number(parsed.farePerKm))) setFarePerKm(Number(parsed.farePerKm));
        }
      }
    }catch(_){ /* ignore */ }
  }, []);

  function onSave(){
    setSaving(true);
    try{
      const payload = { baseFare: Number(baseFare) || 0, farePerKm: Number(farePerKm) || 0 };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      try{ if (typeof window !== 'undefined' && typeof window.showToast === 'function'){ window.showToast('Settings saved', { type: 'success' }); } }catch(_){ }
    }finally{ setSaving(false); }
  }

  function onReset(){
    setBaseFare(0);
    setFarePerKm(2);
    try{ localStorage.removeItem(STORAGE_KEY); }catch(_){ }
  }

  return (
    <SiteLayout>
      <section className="rider-commissions">
        <header className="rc-header">
          <h2 className="rc-title">Settings</h2>
          <p className="rc-subtitle">Manage fares for earnings calculations.</p>
        </header>

        <div className="rc-toolbar">
          <div className="rc-filters">
            <label className="rc-select rc-chip">
              <span>Base Fare</span>
              <input
                type="number"
                className="rc-search-input"
                value={Number.isFinite(baseFare) ? String(baseFare) : ''}
                min="0"
                step="0.01"
                onChange={e=> setBaseFare(e.target.value === '' ? 0 : Number(e.target.value))}
                aria-label="Base Fare"
              />
            </label>
            <label className="rc-select rc-chip">
              <span>Fare per Km</span>
              <input
                type="number"
                className="rc-search-input"
                value={Number.isFinite(farePerKm) ? String(farePerKm) : ''}
                min="0"
                step="0.01"
                onChange={e=> setFarePerKm(e.target.value === '' ? 0 : Number(e.target.value))}
                aria-label="Fare per Km"
              />
            </label>
          </div>
          <div className="rc-filters">
            <button className="rc-select rc-chip" onClick={onSave} disabled={saving}>Save</button>
            <button className="rc-select rc-chip" onClick={onReset} disabled={saving}>Reset</button>
          </div>
        </div>

      </section>
    </SiteLayout>
  );
}
