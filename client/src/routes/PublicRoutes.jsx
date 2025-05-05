import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/public/HomePage';
import AboutPage from '../pages/public/AboutPage';
import CharityListingPage from '../pages/public/CharityListingPage';
import CharityDetails from '../pages/public/CharityDetails';
import StoryPage from '../pages/charity/StoryPage';
import DonationPage from '../pages/donor/DonationPage';
import CharityRegistration from '../components/auth/CharityRegistration';
import DonorRegistration from '../components/auth/DonorRegistration';
import LoginForm from '../components/auth/LoginForm';
import ResetPassword from '../components/auth/ResetPassword';
import RegistrationChoice from '../components/auth/RegistrationChoice';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="charities" element={<CharityListingPage />} />
      <Route path="charity-details/:id/" element={<CharityDetails />} />
      <Route path="donate" element={<DonationPage />} />
      <Route path="charities/:id/stories" element={<StoryPage />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="register" element={<RegistrationChoice />} />
      <Route path="register/charity/:userType" element={<CharityRegistration />} />
      <Route path="register/donor/:userType" element={<DonorRegistration />} />
      <Route path="reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default PublicRoutes;
