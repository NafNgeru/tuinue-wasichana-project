import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import CharityApproval from '../pages/admin/CharityApproval';
import SystemReports from '../pages/admin/SystemReports';
import DeleteCharity from '../pages/admin/DeleteCharity';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="charity-approval" element={<CharityApproval />} />
      <Route path="system-reports" element={<SystemReports />} />
      <Route path="delete-charity" element={<DeleteCharity />} />
    </Routes>
  );
};

export default AdminRoutes;
