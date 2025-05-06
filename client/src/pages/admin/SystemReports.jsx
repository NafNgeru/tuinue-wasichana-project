import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SystemReports = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/charity/admin/donation-stats');
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching donation stats:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <p>Loading system reports...</p>;
  }

  return (
    <section>
      <h1>System Reports</h1>
      <button
        onClick={() => window.history.back()}
        className="mb-4 bg-gray-600 text-white rounded px-4 py-2 hover:bg-gray-700"
      >
        Back to Dashboard
      </button>
      <div>
        <p>Total Donations Made: {stats.total_donations}</p>
        <p>Donations Pending: {stats.pending_donations}</p>
        <p>Donations In Progress: {stats.in_progress_donations}</p>
        <p>Total Amount Donated: ${stats.total_amount.toFixed(2)}</p>
      </div>
    </section>
  );
};

export default SystemReports;
