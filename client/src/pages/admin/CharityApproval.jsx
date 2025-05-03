import React, { useEffect, useState } from 'react';

const CharityApproval = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPendingCharities = async () => {
    try {
      const response = await fetch('/charity/pending');
      if (!response.ok) {
        throw new Error('Failed to fetch pending charities');
      }
      const data = await response.json();
      setCharities(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingCharities();
  }, []);

  const approveCharity = async (id) => {
    try {
      const response = await fetch(`/charity/${id}/approve`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to approve charity');
      }
      setCharities(charities.filter((charity) => charity.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteCharity = async (id) => {
    try {
      const response = await fetch(`/charity/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete charity');
      }
      setCharities(charities.filter((charity) => charity.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="w-full min-h-screen p-8 box-border">
      <h1 className="text-3xl font-bold mb-6">Charity Approval</h1>
      {loading && <p>Loading pending charities...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && charities.length === 0 && <p>No pending charities to approve.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {charities.map((charity) => (
          <div key={charity.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{charity.full_name}</h2>
            <p className="mb-2">{charity.description}</p>
            <p className="mb-4 text-sm text-gray-600">Email: {charity.email}</p>
            <p className="mb-4 text-sm text-gray-600">Website: {charity.website_url}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => approveCharity(charity.id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => deleteCharity(charity.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CharityApproval;
