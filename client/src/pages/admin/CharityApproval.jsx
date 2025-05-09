import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CharityApproval = () => {
  const [charities, setCharities] = useState([]);
  const [pendingCharities, setPendingCharities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCharities = async () => {
    try {
      const allRes = await axios.get('http://localhost:5000/charity/');
      const pendingRes = await axios.get('http://localhost:5000/charity/pending');
      setCharities(allRes.data);
      setPendingCharities(pendingRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching charities:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharities();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:5000/charity/${id}/approve`);
      fetchCharities();
    } catch (error) {
      console.error('Error approving charity:', error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await axios.post(`http://localhost:5000/charity/${id}/decline`);
      fetchCharities();
    } catch (error) {
      console.error('Error declining charity:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/charity/${id}`);
      fetchCharities();
    } catch (error) {
      console.error('Error deleting charity:', error);
    }
  };

  if (loading) {
    return <p>Loading charities...</p>;
  }

  return (
    <section>
      <h1>Charity Approval</h1>
      <button
        onClick={() => window.history.back()}
        className="mb-4 bg-gray-600 text-white rounded px-4 py-2 hover:bg-gray-700"
      >
        Back to Dashboard
      </button>
      <p>Total Registered Charities: {charities.length}</p>

      <h2>Pending Approvals</h2>
      {pendingCharities.length === 0 ? (
        <p>No pending approvals.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {pendingCharities.map((charity) => (
            <div
              key={charity.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                width: '300px',
                position: 'relative',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <button
                onClick={() => handleDelete(charity.id)}
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  backgroundColor: '#e53e3e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.25rem 0.5rem',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
              <button
                onClick={() => handleApprove(charity.id)}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  backgroundColor: '#38a169',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.25rem 0.5rem',
                  cursor: 'pointer',
                }}
              >
                Approve
              </button>
              <h3>{charity.full_name}</h3>
              <p>{charity.email}</p>
              <button
                onClick={() => handleDecline(charity.id)}
                style={{
                  marginTop: '1rem',
                  backgroundColor: '#dd6b20',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                }}
              >
                Decline
              </button>
            </div>
          ))}
        </div>
      )}

      <h2>All Charities</h2>
      {charities.length === 0 ? (
        <p>No charities registered.</p>
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
              }}
            >
              <h3>{charity.full_name}</h3>
              <p>{charity.email}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CharityApproval;
