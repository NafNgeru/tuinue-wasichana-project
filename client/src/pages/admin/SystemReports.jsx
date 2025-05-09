import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SystemReports = () => {
  const [stats, setStats] = useState(null);
  const [charities, setCharities] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingCharities, setLoadingCharities] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/charity/admin/donation-stats');
      setStats(response.data);
      setLoadingStats(false);
    } catch (error) {
      console.error('Error fetching donation stats:', error);
      setLoadingStats(false);
    }
  };

  const fetchCharities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/charity/');
      setCharities(response.data);
      setLoadingCharities(false);
    } catch (error) {
      console.error('Error fetching charities:', error);
      setLoadingCharities(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchCharities();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/charity/${id}`);
      fetchCharities();
    } catch (error) {
      console.error('Error deleting charity:', error);
    }
  };

  if (loadingStats || loadingCharities) {
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
      <h2>Active Charities</h2>
      {charities.length === 0 ? (
        <p>No active charities found.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {charities.map((charity) => (
            <div
              key={charity.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                width: '300px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '180px',
              }}
            >
              <div>
                <h3>{charity.full_name}</h3>
                <p>{charity.email}</p>
                {/* Add other charity details from seed.py as needed */}
              </div>
              <button
                onClick={() => handleDelete(charity.id)}
                style={{
                  backgroundColor: '#e53e3e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  alignSelf: 'center',
                  marginTop: '1rem',
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SystemReports;
