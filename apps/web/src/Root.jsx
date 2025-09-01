import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Orders from './pages/Orders.jsx';
import Reports from './pages/Reports.jsx';
import RiderCommissions from './pages/RiderCommissions.jsx';
import RiderProfile from './pages/RiderProfile.jsx';
import './styles/global.css';

export default function Root() {
  return (
    <div className="app-shell">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/orders" replace />} />
            <Route path="/dashboard" element={<Navigate to="/orders" replace />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/riders" element={<RiderCommissions />} />
            <Route path="/riders/profile" element={<RiderProfile />} />
            <Route path="/customers" element={<div className="panel"><p className="muted-text">Customers page placeholder</p></div>} />
          </Route>
          <Route path="*" element={<Navigate to="/orders" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
