import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CharityDashboard from '../pages/charity/CharityDashboard';
import BeneficiaryManagement from '../pages/charity/BeneficiaryManagement';
import StoryManagement from '../pages/charity/StoryManagement';

const CharityRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CharityDashboard />} />
      <Route path="beneficiaries" element={<BeneficiaryManagement />} />
      <Route path="stories" element={<StoryManagement />} />
    </Routes>
  );
};

export default CharityRoutes;
