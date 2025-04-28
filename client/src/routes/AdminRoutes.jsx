import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import CharityApproval from '../pages/admin/CharityApproval';
import SystemReports from '../pages/admin/SystemReports';

const AdminRoutes = () => {
  // Hide AdminDashboard route by redirecting to login
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="charity-approval" element={<CharityApproval />} />
      <Route path="system-reports" element={<SystemReports />} />
    </Routes>
  );
};

export default AdminRoutes;
