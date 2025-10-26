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
  const [packers, setPackers] = useState([]);
  const [selectedPackers, setSelectedPackers] = useState([]);
  const [showRiderSelection, setShowRiderSelection] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingPackers, setLoadingPackers] = useState(false);
  const [error, setError] = useState('');
  const [packersError, setPackersError] = useState('');
  const [reportRows, setReportRows] = useState([]);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState('');
  const [performanceRows, setPerformanceRows] = useState([]);
  const [performanceLoading, setPerformanceLoading] = useState(false);
  const [performanceError, setPerformanceError] = useState('');
  const [activeTab, setActiveTab] = useState('commission');
  const [dispatcherRows, setDispatcherRows] = useState([]);
  const [dispatcherLoading, setDispatcherLoading] = useState(false);
  const [dispatcherError, setDispatcherError] = useState('');
  const [dispatcherGenerated, setDispatcherGenerated] = useState(false);

  useEffect(()=>{
    const fetchRiders = async () => {
      try {
        const res = await fetch('/api/riders?limit=10000', { credentials: 'include' });
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
    if (activeTab === 'dispatcher'){
      if (selectedPackers.length === packers.length){
        setSelectedPackers([]);
      } else {
        setSelectedPackers(packers.map(p => p.id || p._id || ''));
      }
    } else {
      if (selectedRiders.length === riders.length) {
        setSelectedRiders([]);
      } else {
        setSelectedRiders(riders.map(r => r.id || r._id || ''));
      }
    }
  };

  const handleRiderToggle = (riderId) => {
    if (activeTab === 'dispatcher'){
      setSelectedPackers(prev =>
        prev.includes(riderId)
          ? prev.filter(id => id !== riderId)
          : [...prev, riderId]
      );
    } else {
      setSelectedRiders(prev =>
        prev.includes(riderId)
          ? prev.filter(id => id !== riderId)
          : [...prev, riderId]
      );
    }
  };

  const handleCreateReport = async () => {
    if (activeTab === 'dispatcher') {
      // Load packers then show selection modal
      setPackersError('');
      setLoadingPackers(true);
      try{
        const res = await fetch('/api/packers?limit=500', { credentials: 'include' });
        if (res.status === 401){ window.location.href = '/auth/login'; return; }
        if (!res.ok) throw new Error('Failed to load packers');
        const data = await res.json().catch(()=>null);
        const list = Array.isArray(data?.packers) ? data.packers : [];
        list.sort((a,b)=> (String((a.fullName||a.name||a.full_name||'')).localeCompare(String(b.fullName||b.name||b.full_name||''))));
        setPackers(list);
        setSelectedPackers(list.map(p => p.id || p._id || ''));
        setShowRiderSelection(true);
      }catch(e){
        setPackersError(e?.message || 'Failed to load packers');
      }finally{
        setLoadingPackers(false);
      }
    } else {
      setShowRiderSelection(true);
    }
  };

  const handleConfirmRiderSelection = async () => {
    if(activeTab === 'commission'){
      await handleGenerateReport();
    } else if(activeTab === 'performance'){
      await handleGeneratePerformanceReport();
    } else if(activeTab === 'dispatcher'){
      // For dispatcher, we'll generate using selectedPackers (for now generation is stubbed)
      await handleGenerateDispatcherReport(selectedPackers);
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
      const benchmarkAcceptanceTime = Number(settings?.benchmarkAcceptanceTime) || DEFAULT_FARE_SETTINGS.benchmarkAcceptanceTime;
      const sel = (selectedRiders.length ? riders.filter(r=> selectedRiders.includes(r.id || r._id || '')) : riders);
      const rows = await Promise.all(sel.map(async (r, idx) => {
        const id = r.id || r._id || '';
        try{
          const params = new URLSearchParams({ fromDate, toDate });
          const res = await fetch(`/api/riders/${encodeURIComponent(id)}/performance-report?${params.toString()}`, { credentials: 'include' });
          if(res.status === 401){ window.location.href = '/auth/login'; return null; }
          const json = await res.json().catch(()=>null);
          if(res.ok && json && json.ok){
            return {
              serial: idx + 1,
              riderName: r.name || r.firstName || 'Unknown',
              totalShopifyRides: json.totalShopifyRides || 0,
              totalExtraRides: json.totalExtraRides || 0,
              totalDistanceKm: json.totalDistanceKm || 0,
              expectedDeliveryTime: json.averageExpectedMinutes || 0,
              actualDeliveryTime: json.averageActualMinutes || 0,
              onTimeRate: json.onTimeRate || 0,
              acceptancePercentage: json.acceptancePercentage || 0,
              averageAcceptanceTime: json.averageAcceptanceTime || 0,
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

  async function handleGenerateDispatcherReport(selectedIds = []){
    setDispatcherError('');
    setDispatcherLoading(true);
    try{
      // Use loaded packers (fetched earlier) or empty array
      const list = Array.isArray(packers) ? packers : [];
      const sel = (Array.isArray(selectedIds) && selectedIds.length) ? list.filter(p => selectedIds.includes(p.id || p._id || '')) : list;

      // Collect all order IDs from selected packers
      const allOrderIds = new Set();
      const packerToOrderIds = new Map();
      for (const p of sel){
        const ids = Array.isArray(p.orders) ? p.orders.map(i=>String(i)) : [];
        packerToOrderIds.set(String(p.id || p._id || ''), ids);
        for (const id of ids) allOrderIds.add(String(id));
      }

      // Prepare date bounds
      const start = new Date(fromDate + 'T00:00:00');
      const end = new Date(toDate + 'T23:59:59.999');
      const startTs = start.getTime();
      const endTs = end.getTime();

      // Fetch settings for benchmark acceptance and delivery times
      const settings = readFareSettings();
      const benchmarkAcceptanceTime = Number(settings?.benchmarkAcceptanceTime) || DEFAULT_FARE_SETTINGS.benchmarkAcceptanceTime;
      const benchmarkDeliveryTime = Number(settings?.benchmarkDeliveryTime) || DEFAULT_FARE_SETTINGS.benchmarkDeliveryTime;

      // Fetch each order doc by id (only those referenced by packers)
      const orderIdList = Array.from(allOrderIds);
      const orderInfoMap = new Map(); // id -> { createdTs, assignedTs }
      await Promise.all(orderIdList.map(async (oid) => {
        try{
          const res = await fetch(`/api/orders/${encodeURIComponent(oid)}`, { credentials: 'include' });
          if (res.status === 401){ window.location.href = '/auth/login'; return; }
          if (!res.ok) return;
          const data = await res.json().catch(()=>null);
          const order = data?.order || data;
          if (!order) return;
          const created = order.created_at || order.createdAt || order.created || order.date || order.timestamp;
          const assigned = order.assignedAt || order.assigned_at || order.assigned || order.assignment?.assignedAt || order.assignment?.assigned_at || order.assignment?.assigned || order.assignedAt;
          const deliveryEnd = order.deliveryEndTime || order.delivery_end_time || order.deliveryEnd || order.actual_delivery_time || order.actualDeliveryTime || order.deliveryEndTime;
          let createdTs = NaN;
          let assignedTs = NaN;
          let deliveredTs = NaN;
          if (typeof created === 'number') createdTs = Number(created);
          else if (typeof created === 'string') createdTs = Date.parse(created);
          if (typeof assigned === 'number') assignedTs = Number(assigned);
          else if (typeof assigned === 'string') assignedTs = Date.parse(assigned);
          if (typeof deliveryEnd === 'number') deliveredTs = Number(deliveryEnd);
          else if (typeof deliveryEnd === 'string') deliveredTs = Date.parse(deliveryEnd);
          if (!Number.isNaN(createdTs)){
            orderInfoMap.set(String(oid), { createdTs: createdTs, assignedTs: Number.isFinite(assignedTs) ? assignedTs : null, deliveredTs: Number.isFinite(deliveredTs) ? deliveredTs : null });
          }
        }catch(_){ /* ignore individual order fetch errors */ }
      }));

      // Count per packer and compute average assignment delay (minutes)
      const rows = sel.map((p, idx) => {
        const pid = String(p.id || p._id || '');
        const ids = packerToOrderIds.get(pid) || [];
        let totalOrders = 0;
        let totalDiffMinutes = 0;
        let totalDeliveryDiffMinutes = 0;
        for (const id of ids){
          const info = orderInfoMap.get(String(id));
          if (!info || !info.createdTs) continue;
          const ts = info.createdTs;
          if (ts >= startTs && ts <= endTs){
            totalOrders += 1;
            const assignedTs = info.assignedTs;
            if (assignedTs && Number.isFinite(assignedTs) && assignedTs >= info.createdTs){
              totalDiffMinutes += (assignedTs - info.createdTs) / 60000;
            }
            const deliveredTs = info.deliveredTs;
            if (deliveredTs && Number.isFinite(deliveredTs) && deliveredTs >= info.createdTs){
              totalDeliveryDiffMinutes += (deliveredTs - info.createdTs) / 60000;
            }
          }
        }
        const avgMinutes = totalOrders > 0 ? Math.round(totalDiffMinutes / totalOrders) : 0;
        const avgTotalMinutes = totalOrders > 0 ? Math.round(totalDeliveryDiffMinutes / totalOrders) : 0;
        const packagingEfficiency = (avgMinutes > 0 && benchmarkAcceptanceTime > 0) ? Math.round((benchmarkAcceptanceTime / avgMinutes) * 100) : 0;
        const efficiencyRatio = (avgTotalMinutes > 0 && benchmarkDeliveryTime > 0) ? Math.round((benchmarkDeliveryTime / avgTotalMinutes) * 100) : 0;
        return {
          serial: idx + 1,
          dispatcherName: p.fullName || p.name || p.full_name || 'Unknown',
          totalOrders,
          averageAssignedMinutes: avgMinutes,
          benchmarkAcceptanceTime,
          packagingEfficiency,
          totalAverageMinutes: avgTotalMinutes,
          benchmarkDeliveryTime,
          efficiencyRatio,
        };
      });

      setDispatcherRows(rows);
      setDispatcherGenerated(true);
      return rows;
    }catch(e){
      setDispatcherError(e?.message || 'Failed to generate report');
      return [];
    }finally{
      setDispatcherLoading(false);
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
    } else if(activeTab === 'dispatcher'){
      const rows = dispatcherRows.length ? dispatcherRows : (await handleGenerateDispatcherReport());
      const workbookData = [];

      // Title row
      workbookData.push(['Dispatcher Performance Report']);
      workbookData.push([]);

      // Date rows
      workbookData.push(['From Date:', fromDate]);
      workbookData.push(['To Date:', toDate]);
      workbookData.push([]);

      // Header row
      const header = ['S.no','Dispatcher Name','Total Orders','Average time','Benchmark Time','Packaging efficiency','Total Average Time','Benchmark total','Efficiency Ratio'];
      workbookData.push(header);

      // Data rows
      for (const r of rows){
        workbookData.push([
          r.serial,
          r.dispatcherName,
          r.totalOrders,
          (r.averageAssignedMinutes !== undefined && r.averageAssignedMinutes !== null) ? `${r.averageAssignedMinutes} min` : '',
          (r.benchmarkAcceptanceTime !== undefined && r.benchmarkAcceptanceTime !== null) ? `${r.benchmarkAcceptanceTime} min` : '',
          (r.packagingEfficiency !== undefined && r.packagingEfficiency !== null) ? `${r.packagingEfficiency}%` : '',
          (r.totalAverageMinutes !== undefined && r.totalAverageMinutes !== null) ? `${r.totalAverageMinutes} min` : '',
          (r.benchmarkDeliveryTime !== undefined && r.benchmarkDeliveryTime !== null) ? `${r.benchmarkDeliveryTime} min` : '',
          (r.efficiencyRatio !== undefined && r.efficiencyRatio !== null) ? `${r.efficiencyRatio}%` : '',
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
        { wch: 20 },
        { wch: 14 },
        { wch: 16 },
        { wch: 16 },
        { wch: 20 },
        { wch: 18 },
        { wch: 16 },
        { wch: 16 }
      ];

      // Write and download
      XLSX.writeFile(wb, `dispatcher-performance-${fromDate}_to_${toDate}.xlsx`);
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

              {dispatcherError && <div className="auth-error">{dispatcherError}</div>}
              {dispatcherLoading && <div className="section-note">Generating…</div>}
              {dispatcherGenerated && !dispatcherLoading && (
                <div className="report-table-wrap">
                  <div className="report-meta">
                    <div><strong>From Date:</strong> {fromDate}</div>
                    <div><strong>To Date:</strong> {toDate}</div>
                  </div>
                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>S.no</th>
                        <th>Dispatcher Name</th>
                        <th>Total Orders</th>
                        <th>Average time</th>
                        <th>Benchmark Time</th>
                        <th>Packaging efficiency</th>
                        <th>Total Average Time</th>
                        <th>Benchmark total</th>
                        <th>Efficiency Ratio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dispatcherRows.map((row, i) => (
                        <tr key={i}>
                          <td>{row.serial}</td>
                          <td>{row.dispatcherName}</td>
                          <td>{row.totalOrders}</td>
                          <td>{(row.averageAssignedMinutes !== undefined && row.averageAssignedMinutes !== null) ? `${row.averageAssignedMinutes} min` : ''}</td>
                          <td>{row.benchmarkAcceptanceTime ? `${row.benchmarkAcceptanceTime} min` : ''}</td>
                          <td>{(row.packagingEfficiency !== undefined && row.packagingEfficiency !== null) ? `${row.packagingEfficiency}%` : ''}</td>
                          <td>{(row.totalAverageMinutes !== undefined && row.totalAverageMinutes !== null) ? `${row.totalAverageMinutes} min` : ''}</td>
                          <td>{row.benchmarkDeliveryTime ? `${row.benchmarkDeliveryTime} min` : ''}</td>
                          <td>{(row.efficiencyRatio !== undefined && row.efficiencyRatio !== null) ? `${row.efficiencyRatio}%` : ''}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {showRiderSelection && (
            <div className="rider-selection-modal-overlay" onClick={() => setShowRiderSelection(false)}>
              <div className="rider-selection-modal" onClick={(e) => e.stopPropagation()}>
                <h4 className="modal-title">{activeTab === 'dispatcher' ? 'Select Packers for Report' : 'Select Riders for Report'}</h4>

                <div className="modal-content">
                  <button className="select-all-button" onClick={handleSelectAll}>
                    {activeTab === 'dispatcher' ? (selectedPackers.length === packers.length ? 'Deselect All' : 'Select All') : (selectedRiders.length === riders.length ? 'Deselect All' : 'Select All')}
                  </button>

                  <div className="riders-list">
                    {activeTab === 'dispatcher' ? (
                      (packersError && <div className="auth-error">{packersError}</div>) || (loadingPackers ? <div className="section-note">Loading…</div> : (
                        [...packers].sort((a, b) => {
                          const nameA = String(a.fullName || a.name || a.full_name || '').toLowerCase();
                          const nameB = String(b.fullName || b.name || b.full_name || '').toLowerCase();
                          return nameA.localeCompare(nameB);
                        }).map(packer => (
                          <label key={packer.id || packer._id} className="rider-checkbox-label">
                            <input
                              type="checkbox"
                              className="rider-checkbox"
                              checked={selectedPackers.includes(packer.id || packer._id || '')}
                              onChange={() => handleRiderToggle(packer.id || packer._id || '')}
                            />
                            <span className="rider-name">{packer.fullName || packer.name || packer.full_name || 'Unknown'}</span>
                          </label>
                        ))
                      ))
                    ) : (
                      [...riders].sort((a, b) => {
                        const nameA = (a.name || a.firstName || 'Unknown').toLowerCase();
                        const nameB = (b.name || b.firstName || 'Unknown').toLowerCase();
                        return nameA.localeCompare(nameB);
                      }).map(rider => (
                        <label key={rider.id || rider._id} className="rider-checkbox-label">
                          <input
                            type="checkbox"
                            className="rider-checkbox"
                            checked={selectedRiders.includes(rider.id || rider._id || '')}
                            onChange={() => handleRiderToggle(rider.id || rider._id || '')}
                          />
                          <span className="rider-name">{rider.name || rider.firstName || 'Unknown'}</span>
                        </label>
                      ))
                    )}
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="cancel-button" onClick={() => setShowRiderSelection(false)}>Cancel</button>
                  <button className="confirm-button" onClick={handleConfirmRiderSelection}>Generate Report</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
