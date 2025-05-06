import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Admin.css';
import axios from 'axios';

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
    <section className="admin-dashboard">
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
    </section>
  );
};

export default AdminDashboard;
