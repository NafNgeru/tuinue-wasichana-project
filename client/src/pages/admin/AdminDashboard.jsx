import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Admin.css';
import axios from 'axios';
import back1 from '../../assets/images/back1.jpeg';
import back2 from '../../assets/images/back2.jpeg';
import back3 from '../../assets/images/back3.jpg';
import back4 from '../../assets/images/back4.jpg';

const AdminDashboard = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [donationStats, setDonationStats] = useState(null);

  const fetchPendingCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/charity/pending');
      setPendingCount(response.data.length);
    } catch (error) {
      console.error('Error fetching pending charities:', error);
    }
  };

  const fetchDonationStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/charity/admin/donation-stats');
      setDonationStats(response.data);
    } catch (error) {
      console.error('Error fetching donation stats:', error);
    }
  };

  useEffect(() => {
    fetchPendingCount();
    fetchDonationStats();
  }, []);

  return (
    <section className="admin-dashboard" style={{ minHeight: '100vh', position: 'relative' }}>
      <BackgroundSlideshow />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard.</p>
        <nav className="admin-nav">
          <ul>
            <li><Link to="/admin/charity-approval">Charity Approvals</Link></li>
            <li><Link to="/admin/system-reports">System Reports</Link></li>
          </ul>
        </nav>
        <div className="dashboard-widgets">
          <div className="widget">
            <h2>Pending Approvals</h2>
            <p>Number of charities awaiting approval: {pendingCount}</p>
          </div>
          <div className="widget">
            <h2>Donation Stats</h2>
            {donationStats ? (
              <>
                <p>Total Donations Made: {donationStats.total_donations}</p>
                <p>Donations Pending: {donationStats.pending_donations}</p>
                <p>Donations In Progress: {donationStats.in_progress_donations}</p>
                <p>Total Amount Donated: ${donationStats.total_amount.toFixed(2)}</p>
              </>
            ) : (
              <p>Loading donation stats...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const BackgroundSlideshow = () => {
  const images = [back1, back2, back3, back4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(images.length - 1);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((currentIndex + 1) % images.length);
      setFade(false);
      setTimeout(() => setFade(true), 50);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const baseStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 1s ease-in-out',
    zIndex: 0,
  };

  return (
    <>
      <div
        style={{
          ...baseStyle,
          backgroundImage: `url(${images[prevIndex]})`,
          opacity: fade ? 0 : 1,
        }}
      />
      <div
        style={{
          ...baseStyle,
          backgroundImage: `url(${images[currentIndex]})`,
          opacity: fade ? 1 : 0,
        }}
      />
    </>
  );
};

export default AdminDashboard;
