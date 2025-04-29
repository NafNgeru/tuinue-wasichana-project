import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/donor/donorDashboard.';
import DonationPage from '../pages/donor/DonationPage';
import SettingsPage from '../pages/donor/SettingsPage';

const DonorRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="donate" element={<DonationPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Routes>
  );
};

export default DonorRoutes;
