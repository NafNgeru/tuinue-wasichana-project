import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CharityDashboard from '../pages/charity/CharityDashboard';
import BeneficiaryManagement from '../pages/charity/BeneficiaryManagement';
import StoryManagement from '../pages/charity/StoryManagement';
import CharityDetails from '../pages/charity/CharityDetails';

const CharityRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CharityDashboard />} />
      <Route path="beneficiaries" element={<BeneficiaryManagement />} />
      <Route path="stories" element={<StoryManagement />} />
      <Route path="charity-details" element={<CharityDetails />} />
    </Routes>
  );
};

export default CharityRoutes;
