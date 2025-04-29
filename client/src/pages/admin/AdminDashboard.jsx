import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Admin.css';

const AdminDashboard = () => {
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
          <p>Number of charities awaiting approval: 5</p>
        </div>
        <div className="widget">
          <h2>System Status</h2>
          <p>All systems operational</p>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
