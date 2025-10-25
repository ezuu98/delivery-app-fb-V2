import React, { useEffect, useState } from 'react';
import SiteLayout from '../components/SiteLayout.jsx';

export default function Reports(){
  const getFirstOfMonth = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const [fromDate, setFromDate] = useState(getFirstOfMonth());
  const [toDate, setToDate] = useState(getTodayDate());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(()=>{
    setLoading(false);
  },[]);

  return (
    <SiteLayout>
      <section className="rider-commissions">
        <header className="rc-header">
          <h2 className="rc-title">Reporting & Analytics</h2>
        </header>

        <div id="tab-overview">
          <h3 className="rc-section-title">Rider Commission Report</h3>

          <div className="rc-toolbar">
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
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
