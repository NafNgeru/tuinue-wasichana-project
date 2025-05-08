import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DonorDashboard from '../pages/donor/DonorDashboard';
import DonationPage from '../pages/donor/DonationPage';
import SettingsPage from '../pages/donor/SettingsPage';
import DonationHistory from '../pages/donor/DonationHistory';
import BeneficiaryStory from '../pages/donor/BeneficiaryStory';

const DonorRoutes = () => {
  return (
    <Routes>
      <Route path="/:id" element={<DonorDashboard />} />
      <Route path="/:donorId/donate/:charityId" element={<DonationPage />} />
      <Route path="/:id/settings" element={<SettingsPage />} />
      <Route path="/:id/donation-history" element={<DonationHistory />} />
      <Route path="/:id/beneficiary-stories" element={<BeneficiaryStory />} />
    </Routes>
  );
};

export default DonorRoutes;
