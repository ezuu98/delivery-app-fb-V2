import React, { useEffect, useState } from 'react';
import SiteLayout from '../components/SiteLayout.jsx';

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

  useEffect(()=>{
    const fetchRiders = async () => {
      try {
        const res = await fetch('/api/riders', { credentials: 'include' });
        if (res.status === 401) { window.location.href = '/auth/login'; return; }
        if (!res.ok) throw new Error('Failed to load riders');
        const data = await res.json();
        const ridersList = data.data || [];
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

              <button className="rc-button report-button" onClick={() => console.log('Generate report:', {fromDate, toDate})}>
                Create Report
              </button>

              <button className="rc-button download-button" onClick={() => console.log('Download report:', {fromDate, toDate})}>
                Download
              </button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
