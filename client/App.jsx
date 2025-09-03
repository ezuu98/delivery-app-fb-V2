import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Riders from './pages/Riders.jsx';
import RiderProfile from './pages/RiderProfile.jsx';
import Orders from './pages/Orders.jsx';
import Reports from './pages/Reports.jsx';
import Customers from './pages/Customers.jsx';

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/riders" element={<Riders />} />
        <Route path="/riders/:id" element={<RiderProfile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/dashboard" element={<Navigate to="/riders" replace />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
