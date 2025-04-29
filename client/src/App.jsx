import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Header';
import Footer from './components/Footer';
import PublicRoutes from './routes/PublicRoutes';
import DonorRoutes from './routes/DonorRoutes';
import CharityRoutes from './routes/CharityRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { useSelector } from 'react-redux';

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/*" element={<PublicRoutes />} />
            {user && user.role === 'donor' && <Route path="/donor/*" element={<DonorRoutes />} />}
            {user && user.role === 'charity' && <Route path="/charity/*" element={<CharityRoutes />} />}
            {user && user.role === 'admin' && <Route path="/admin/*" element={<AdminRoutes />} />}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
