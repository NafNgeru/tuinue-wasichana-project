import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/public/HomePage';
import AboutPage from '../pages/public/AboutPage';
import CharityListingPage from '../pages/public/CharityListingPage';
import CharityRegistration from '../components/auth/CharityRegistration';
import DonorRegistration from '../components/auth/DonorRegistration';
import LoginForm from '../components/auth/LoginForm';
import ResetPassword from '../components/auth/ResetPassword';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="charities" element={<CharityListingPage />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="register/charity" element={<CharityRegistration />} />
      <Route path="register/donor" element={<DonorRegistration />} />
      <Route path="reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default PublicRoutes;
