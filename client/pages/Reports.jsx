import React, { useEffect, useState } from 'react';
import SiteLayout from '../components/SiteLayout.jsx';
import { readFareSettings, DEFAULT_FARE_SETTINGS } from '../utils/fareSettings.js';
import * as XLSX from 'xlsx';

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
  const [performanceRows, setPerformanceRows] = useState([]);
  const [performanceLoading, setPerformanceLoading] = useState(false);
  const [performanceError, setPerformanceError] = useState('');
  const [activeTab, setActiveTab] = useState('commission');

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

  const handleConfirmRiderSelection = async () => {
    if(activeTab === 'commission'){
      await handleGenerateReport();
    } else if(activeTab === 'performance'){
      await handleGeneratePerformanceReport();
    }
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
          const res = await fetch(`/api/riders/${encodeURIComponent(id)}/km-in-range?${params.toString()}`, { credentials: 'include' });
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
      const filtered = rows.filter(Boolean);
      setReportRows(filtered);
      return filtered;
    }catch(e){
      setReportError(e?.message || 'Failed to generate report');
      return [];
    }finally{
      setReportLoading(false);
      setShowRiderSelection(false);
    }
  }

  async function handleGeneratePerformanceReport(){
    setPerformanceError('');
    setPerformanceLoading(true);
    try{
      const settings = readFareSettings();
      const benchmarkAcceptanceTime = Number(settings?.farePerKm) || DEFAULT_FARE_SETTINGS.farePerKm;
      const sel = (selectedRiders.length ? riders.filter(r=> selectedRiders.includes(r.id || r._id || '')) : riders);
      const rows = await Promise.all(sel.map(async (r, idx) => {
        const id = r.id || r._id || '';
        try{
          const params = new URLSearchParams({ fromDate, toDate });
          const res = await fetch(`/api/riders/${encodeURIComponent(id)}/performance-report?${params.toString()}`, { credentials: 'include' });
          if(res.status === 401){ window.location.href = '/auth/login'; return null; }
          const json = await res.json().catch(()=>null);
          if(res.ok && json && json.ok){
            const data = json.data || {};
            return {
              serial: idx + 1,
              riderName: r.name || r.firstName || 'Unknown',
              totalShopifyRides: data.totalShopifyRides || 0,
              totalExtraRides: data.totalExtraRides || 0,
              totalDistanceKm: data.totalDistanceKm || 0,
              expectedDeliveryTime: data.averageExpectedMinutes || 0,
              actualDeliveryTime: data.averageActualMinutes || 0,
              onTimeRate: data.onTimeRate || 0,
              acceptancePercentage: data.acceptancePercentage || 0,
              averageAcceptanceTime: data.averageAcceptanceTime || 0,
              benchmarkAcceptanceTime,
            };
          }
        }catch(_){ /* noop */ }
        return null;
      }));
      const filtered = rows.filter(Boolean);
      setPerformanceRows(filtered);
      return filtered;
    }catch(e){
      setPerformanceError(e?.message || 'Failed to generate report');
      return [];
    }finally{
      setPerformanceLoading(false);
      setShowRiderSelection(false);
    }
  }

  async function handleDownload(){
    if(activeTab === 'commission'){
      const rows = reportRows.length ? reportRows : (await handleGenerateReport());
      if (!rows || !rows.length) return;

      const workbookData = [];

      // Title row
      workbookData.push(['Rider Commission Report']);
      workbookData.push([]);

      // Date rows
      workbookData.push(['From Date:', fromDate]);
      workbookData.push(['To Date:', toDate]);
      workbookData.push([]);

      // Header row
      const header = ['Rider Name','Total Shopify Rides','Total Extra Rides','Total Distance Travelled','per km rate','Total Commission'];
      workbookData.push(header);

      // Data rows
      for (const r of rows){
        workbookData.push([
          r.riderName,
          r.totalShopifyRides,
          r.extraRides,
          Number(r.distanceKm).toFixed(2),
          Number(r.perKmRate).toFixed(2),
          Number(r.totalCommission).toFixed(2),
        ]);
      }

      // Create workbook and worksheet
      const ws = XLSX.utils.aoa_to_sheet(workbookData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Report');

      // Make header row bold (row 6, which is index 5 in 0-based, but in XLSX it's the 6th row)
      const headerRowIndex = 6;
      for (let col = 0; col < header.length; col++){
        const cellAddress = XLSX.utils.encode_cell({r: headerRowIndex - 1, c: col});
        if (!ws[cellAddress]) ws[cellAddress] = {};
        ws[cellAddress].font = { bold: true };
      }

      // Set column widths for better readability
      ws['!cols'] = [
        { wch: 18 },
        { wch: 16 },
        { wch: 16 },
        { wch: 22 },
        { wch: 14 },
        { wch: 18 }
      ];

      // Write and download
      XLSX.writeFile(wb, `rider-commission-${fromDate}_to_${toDate}.xlsx`);
    } else if(activeTab === 'performance'){
      const rows = performanceRows.length ? performanceRows : (await handleGeneratePerformanceReport());
      if (!rows || !rows.length) return;

      const workbookData = [];

      // Title row
      workbookData.push(['Rider Performance Report']);
      workbookData.push([]);

      // Date rows
      workbookData.push(['From Date:', fromDate]);
      workbookData.push(['To Date:', toDate]);
      workbookData.push([]);

      // Header row
      const header = ['S.no','Rider Name','Total Shopify Rides','Total Extra Rides','Total Distance Travelled','Expected Time for Deliveries','Actual Delivery Time','On Time Rate','% of Orders Accepted','Average Rider Acceptance Time','Benchmark Acceptance Time'];
      workbookData.push(header);

      // Data rows
      for (const r of rows){
        workbookData.push([
          r.serial,
          r.riderName,
          r.totalShopifyRides,
          r.totalExtraRides,
          Number(r.totalDistanceKm).toFixed(2),
          r.expectedDeliveryTime,
          r.actualDeliveryTime,
          r.onTimeRate + '%',
          r.acceptancePercentage + '%',
          r.averageAcceptanceTime,
          r.benchmarkAcceptanceTime,
        ]);
      }

      // Create workbook and worksheet
      const ws = XLSX.utils.aoa_to_sheet(workbookData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Report');

      // Make header row bold
      const headerRowIndex = 6;
      for (let col = 0; col < header.length; col++){
        const cellAddress = XLSX.utils.encode_cell({r: headerRowIndex - 1, c: col});
        if (!ws[cellAddress]) ws[cellAddress] = {};
        ws[cellAddress].font = { bold: true };
      }

      // Set column widths for better readability
      ws['!cols'] = [
        { wch: 8 },
        { wch: 16 },
        { wch: 18 },
        { wch: 16 },
        { wch: 22 },
        { wch: 22 },
        { wch: 18 },
        { wch: 14 },
        { wch: 18 },
        { wch: 24 },
        { wch: 22 }
      ];

      // Write and download
      XLSX.writeFile(wb, `rider-performance-${fromDate}_to_${toDate}.xlsx`);
    }
  }

  return (
    <SiteLayout>
      <section className="rider-commissions">
        <div className="reports-tabs-container">
          <div className="reports-tabs-navigation">
            <button
              className={`reports-tab-button ${activeTab === 'commission' ? 'active' : ''}`}
              onClick={() => setActiveTab('commission')}
            >
              Commission Report
            </button>
            <button
              className={`reports-tab-button ${activeTab === 'performance' ? 'active' : ''}`}
              onClick={() => setActiveTab('performance')}
            >
              Performance Report
            </button>
            <button
              className={`reports-tab-button ${activeTab === 'dispatcher' ? 'active' : ''}`}
              onClick={() => setActiveTab('dispatcher')}
            >
              Dispatcher Performance Report
            </button>
          </div>

          {activeTab === 'commission' && (
            <div id="tab-commission" className="reports-tab-content">
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

                  <button className="rc-button download-button" onClick={handleDownload}>
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
                      <button className="confirm-button" onClick={handleConfirmRiderSelection}>Generate Report</button>
                    </div>
                  </div>
                </div>
              )}

              {reportError && <div className="auth-error">{reportError}</div>}
              {reportLoading && <div className="section-note">Generating…</div>}
              {!reportLoading && reportRows.length > 0 && (
                <div className="report-table-wrap">
                  <div className="report-meta">
                    <div><strong>From Date:</strong> {fromDate}</div>
                    <div><strong>To Date:</strong> {toDate}</div>
                  </div>
                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>Rider Name</th>
                        <th>Total Shopify Rides</th>
                        <th>Total Extra Rides</th>
                        <th>Total Distance Travelled</th>
                        <th>per km rate</th>
                        <th>Total Commission</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportRows.map((row, i) => (
                        <tr key={i}>
                          <td>{row.riderName}</td>
                          <td>{row.totalShopifyRides}</td>
                          <td>{row.extraRides}</td>
                          <td>{Number(row.distanceKm).toFixed(2)}</td>
                          <td>{Number(row.perKmRate).toFixed(2)}</td>
                          <td>{Number(row.totalCommission).toFixed(2)} Rs.</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'performance' && (
            <div id="tab-performance" className="reports-tab-content">
              <h3 className="rc-section-title">Rider Performance Report</h3>

              <div className="rc-toolbar report-filter-bar">
                <div className="date-range-filters">
                  <div className="date-filter">
                    <label htmlFor="perfFromDate" className="date-label">From Date:</label>
                    <input
                      id="perfFromDate"
                      type="date"
                      className="date-input"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>

                  <div className="date-filter">
                    <label htmlFor="perfToDate" className="date-label">To Date:</label>
                    <input
                      id="perfToDate"
                      type="date"
                      className="date-input"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>

                  <button className="rc-button report-button" onClick={handleCreateReport}>
                    Create Report
                  </button>

                  <button className="rc-button download-button" onClick={handleDownload}>
                    Download
                  </button>
                </div>
              </div>

              {performanceError && <div className="auth-error">{performanceError}</div>}
              {performanceLoading && <div className="section-note">Generating…</div>}
              {!performanceLoading && performanceRows.length > 0 && (
                <div className="report-table-wrap">
                  <div className="report-meta">
                    <div><strong>From Date:</strong> {fromDate}</div>
                    <div><strong>To Date:</strong> {toDate}</div>
                  </div>
                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>S.no</th>
                        <th>Rider Name</th>
                        <th>Total Shopify Rides</th>
                        <th>Total Extra Rides</th>
                        <th>Total Distance Travelled</th>
                        <th>Expected Time for Deliveries</th>
                        <th>Actual Delivery Time</th>
                        <th>On Time Rate</th>
                        <th>% of Orders Accepted</th>
                        <th>Average Rider Acceptance Time</th>
                        <th>Benchmark Acceptance Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {performanceRows.map((row, i) => (
                        <tr key={i}>
                          <td>{row.serial}</td>
                          <td>{row.riderName}</td>
                          <td>{row.totalShopifyRides}</td>
                          <td>{row.totalExtraRides}</td>
                          <td>{Number(row.totalDistanceKm).toFixed(2)}</td>
                          <td>{row.expectedDeliveryTime}</td>
                          <td>{row.actualDeliveryTime}</td>
                          <td>{row.onTimeRate}%</td>
                          <td>{row.acceptancePercentage}%</td>
                          <td>{row.averageAcceptanceTime}</td>
                          <td>{row.benchmarkAcceptanceTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'dispatcher' && (
            <div id="tab-dispatcher" className="reports-tab-content">
              <h3 className="rc-section-title">Dispatcher Performance Report</h3>

              <div className="rc-toolbar report-filter-bar">
                <div className="date-range-filters">
                  <div className="date-filter">
                    <label htmlFor="dispFromDate" className="date-label">From Date:</label>
                    <input
                      id="dispFromDate"
                      type="date"
                      className="date-input"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>

                  <div className="date-filter">
                    <label htmlFor="dispToDate" className="date-label">To Date:</label>
                    <input
                      id="dispToDate"
                      type="date"
                      className="date-input"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>

                  <button className="rc-button report-button" onClick={handleCreateReport}>
                    Create Report
                  </button>

                  <button className="rc-button download-button" onClick={handleDownload}>
                    Download
                  </button>
                </div>
              </div>

              <div className="reports-empty-state">
                <p>Dispatcher Performance Report - Coming Soon</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
