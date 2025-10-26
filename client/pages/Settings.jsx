import React, { useEffect, useState } from 'react';
import SiteLayout from '../components/SiteLayout.jsx';
import { DEFAULT_FARE_SETTINGS, FARE_SETTINGS_STORAGE_KEY, readFareSettings } from '../utils/fareSettings.js';

export default function Settings(){
  const [baseFare, setBaseFare] = useState(DEFAULT_FARE_SETTINGS.baseFare);
  const [farePerKm, setFarePerKm] = useState(DEFAULT_FARE_SETTINGS.farePerKm);
  const [benchmarkAcceptanceTime, setBenchmarkAcceptanceTime] = useState(DEFAULT_FARE_SETTINGS.benchmarkAcceptanceTime);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const settings = readFareSettings();
    setBaseFare(settings.baseFare);
    setFarePerKm(settings.farePerKm);
    setBenchmarkAcceptanceTime(settings.benchmarkAcceptanceTime);
  }, []);

  function onSave(){
    setSaving(true);
    try{
      const payload = { baseFare: Number(baseFare) || 0, farePerKm: Number(farePerKm) || 0 };
      if (typeof window !== 'undefined' && window.localStorage){
        window.localStorage.setItem(FARE_SETTINGS_STORAGE_KEY, JSON.stringify(payload));
        try{ window.dispatchEvent(new Event('fare-settings-changed')); }catch(_){ }
      }
      try{ if (typeof window !== 'undefined' && typeof window.showToast === 'function'){ window.showToast('Settings saved', { type: 'success' }); } }catch(_){ }
    }finally{ setSaving(false); }
  }

  function onReset(){
    setBaseFare(DEFAULT_FARE_SETTINGS.baseFare);
    setFarePerKm(DEFAULT_FARE_SETTINGS.farePerKm);
    try{
      if (typeof window !== 'undefined' && window.localStorage){
        window.localStorage.removeItem(FARE_SETTINGS_STORAGE_KEY);
        try{ window.dispatchEvent(new Event('fare-settings-changed')); }catch(_){ }
      }
    }catch(_){ }
  }

  return (
    <SiteLayout>
      <section className="rider-commissions">
        <header className="rc-header">
          <h2 className="rc-title">Settings</h2>
          <p className="rc-subtitle">Manage fares for earnings calculations.</p>
        </header>

        <div className="fare-settings-card">
          <div className="fare-fields">
            <label className="fare-field">
              <span className="fare-field-label">Base Fare</span>
              <input
                type="number"
                className="fare-field-input"
                value={Number.isFinite(baseFare) ? String(baseFare) : ''}
                min="0"
                step="0.01"
                onChange={e => setBaseFare(e.target.value === '' ? 0 : Number(e.target.value))}
                aria-label="Base Fare"
              />
            </label>
            <label className="fare-field">
              <span className="fare-field-label">Fare per Km</span>
              <input
                type="number"
                className="fare-field-input"
                value={Number.isFinite(farePerKm) ? String(farePerKm) : ''}
                min="0"
                step="0.01"
                onChange={e => setFarePerKm(e.target.value === '' ? 0 : Number(e.target.value))}
                aria-label="Fare per Km"
              />
            </label>
          </div>
          <div className="fare-actions">
            <button className="btn-primary" onClick={onSave} disabled={saving}>Save</button>
            <button className="btn-secondary" onClick={onReset} disabled={saving}>Reset</button>
          </div>
        </div>

      </section>
    </SiteLayout>
  );
}
