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
        <ul>
          {pendingCharities.map((charity) => (
            <li key={charity.id} style={{ marginBottom: '1rem' }}>
              <strong>{charity.full_name}</strong> - {charity.email}
              <div>
                <button onClick={() => handleApprove(charity.id)} style={{ marginRight: '0.5rem' }}>
                  Approve
                </button>
                <button onClick={() => handleDecline(charity.id)}>Decline</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h2>All Charities</h2>
      {charities.length === 0 ? (
        <p>No charities registered.</p>
      ) : (
        <ul>
          {charities.map((charity) => (
            <li key={charity.id}>
              <strong>{charity.full_name}</strong> - {charity.email}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CharityApproval;
