import React, { useEffect, useState } from 'react';
import SiteLayout from '../components/SiteLayout.jsx';
import { readFareSettings, DEFAULT_FARE_SETTINGS } from '../utils/fareSettings.js';

export default function Reports(){
  const getFirstOfMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}-01`;
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [fromDate, setFromDate] = useState(getFirstOfMonth());
  const [toDate, setToDate] = useState(getTodayDate());
  const [riders, setRiders] = useState([]);
  const [selectedRiders, setSelectedRiders] = useState([]);
  const [showRiderSelection, setShowRiderSelection] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reportRows, setReportRows] = useState([]);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState('');

  useEffect(()=>{
    const fetchRiders = async () => {
      try {
        const res = await fetch('/api/riders', { credentials: 'include' });
        if (res.status === 401) { window.location.href = '/auth/login'; return; }
        if (!res.ok) throw new Error('Failed to load riders');
        const data = await res.json();
        const ridersList = Array.isArray(data.riders) ? data.riders : (Array.isArray(data.data?.riders) ? data.data.riders : (Array.isArray(data.data) ? data.data : []));
        setRiders(ridersList);
        setSelectedRiders(ridersList.map(r => r.id || r._id || ''));
      } catch (e) {
        setError(e.message || 'Failed to load riders');
      } finally {
        setLoading(false);
      }
    };
    fetchRiders();
  },[]);

  const handleSelectAll = () => {
    if (selectedRiders.length === riders.length) {
      setSelectedRiders([]);
    } else {
      setSelectedRiders(riders.map(r => r.id || r._id || ''));
    }
  };

  const handleRiderToggle = (riderId) => {
    setSelectedRiders(prev =>
      prev.includes(riderId)
        ? prev.filter(id => id !== riderId)
        : [...prev, riderId]
    );
  };

  const handleCreateReport = () => {
    setShowRiderSelection(true);
  };

  async function handleGenerateReport(){
    setReportError('');
    setReportLoading(true);
    try{
      const settings = readFareSettings();
      const baseFare = Number(settings?.baseFare) || DEFAULT_FARE_SETTINGS.baseFare;
      const perKm = Number(settings?.farePerKm) || DEFAULT_FARE_SETTINGS.farePerKm;
      const sel = (selectedRiders.length ? riders.filter(r=> selectedRiders.includes(r.id || r._id || '')) : riders);
      const rows = await Promise.all(sel.map(async (r, idx) => {
        const id = r.id || r._id || '';
        let totalKm = 0;
        let rideCount = 0;
        try{
          const params = new URLSearchParams({ fromDate, toDate });
          const res = await fetch(`/api/riders/${encodeURIComponent(id)}/km?${params.toString()}`, { credentials: 'include' });
          if(res.status === 401){ window.location.href = '/auth/login'; return null; }
          const json = await res.json().catch(()=>null);
          if(res.ok && json && json.ok){
            totalKm = Number(json.totalKm) || 0;
            rideCount = Number(json.rideCount) || 0;
          }
        }catch(_){ /* noop */ }
        const totalCommission = (totalKm * perKm) + (rideCount * baseFare);
        return {
          serial: idx + 1,
          riderName: r.name || r.firstName || 'Unknown',
          totalShopifyRides: rideCount,
          extraRides: 0,
          distanceKm: totalKm,
          perKmRate: perKm,
          totalCommission,
        };
      }));
      setReportRows(rows.filter(Boolean));
    }catch(e){
      setReportError(e?.message || 'Failed to generate report');
    }finally{
      setReportLoading(false);
      setShowRiderSelection(false);
    }
  }

  return (
    <SiteLayout>
      <section className="rider-commissions">
        <div id="tab-overview">
          <h3 className="rc-section-title">Rider Commission Report</h3>

          <div className="rc-toolbar report-filter-bar">
            <div className="date-range-filters">
              <div className="date-filter">
                <label htmlFor="fromDate" className="date-label">From Date:</label>
                <input
                  id="fromDate"
                  type="date"
                  className="date-input"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div className="date-filter">
                <label htmlFor="toDate" className="date-label">To Date:</label>
                <input
                  id="toDate"
                  type="date"
                  className="date-input"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              <button className="rc-button report-button" onClick={handleCreateReport}>
                Create Report
              </button>

              <button className="rc-button download-button" onClick={() => console.log('Download report:', {fromDate, toDate})}>
                Download
              </button>
            </div>
          </div>

          {showRiderSelection && (
            <div className="rider-selection-modal-overlay" onClick={() => setShowRiderSelection(false)}>
              <div className="rider-selection-modal" onClick={(e) => e.stopPropagation()}>
                <h4 className="modal-title">Select Riders for Report</h4>

                <div className="modal-content">
                  <button className="select-all-button" onClick={handleSelectAll}>
                    {selectedRiders.length === riders.length ? 'Deselect All' : 'Select All'}
                  </button>

                  <div className="riders-list">
                    {riders.map(rider => (
                      <label key={rider.id || rider._id} className="rider-checkbox-label">
                        <input
                          type="checkbox"
                          className="rider-checkbox"
                          checked={selectedRiders.includes(rider.id || rider._id || '')}
                          onChange={() => handleRiderToggle(rider.id || rider._id || '')}
                        />
                        <span className="rider-name">{rider.name || rider.firstName || 'Unknown'}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="cancel-button" onClick={() => setShowRiderSelection(false)}>Cancel</button>
                  <button className="confirm-button" onClick={handleGenerateReport}>Generate Report</button>
                </div>
              </div>
            </div>
          )}

          {reportError && <div className="auth-error">{reportError}</div>}
          {reportLoading && <div className="section-note">Generating…</div>}
          {!reportLoading && reportRows.length > 0 && (
            <div className="report-table-wrap">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Rider Name</th>
                    <th>Total Shopify Rides</th>
                    <th>Extra Rides</th>
                    <th>Distance travelled</th>
                    <th>Per km Rate</th>
                    <th>Total Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {reportRows.map((row, i) => (
                    <tr key={i}>
                      <td>{row.serial}</td>
                      <td>{row.riderName}</td>
                      <td>{row.totalShopifyRides}</td>
                      <td>{row.extraRides}</td>
                      <td>{Number(row.distanceKm).toFixed(2)} km</td>
                      <td>{Number(row.perKmRate).toFixed(2)}</td>
                      <td>{Number(row.totalCommission).toFixed(2)} Rs.</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
