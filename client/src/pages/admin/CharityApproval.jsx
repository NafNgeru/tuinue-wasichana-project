import React, { useEffect, useState } from "react";
import api from "../../services/api";

const CharityApproval = () => {
  const [pendingCharities, setPendingCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPendingCharities = async () => {
    try {
      const response = await api.get("http://localhost:5000/charity/pending");
      setPendingCharities(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch pending charities.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingCharities();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.post(`http://localhost:5000/charity/${id}/approve`);
      setPendingCharities((prev) => prev.filter((charity) => charity.id !== id));
    } catch (err) {
      setError("Failed to approve charity.");
    }
  };

  const handleDecline = async (id) => {
    try {
      await api.post(`http://localhost:5000/charity/${id}/decline`);
      setPendingCharities((prev) => prev.filter((charity) => charity.id !== id));
    } catch (err) {
      setError("Failed to decline charity.");
    }
  };

  if (loading) return <p>Loading pending charity applications...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Pending Charity Applications</h2>
      {pendingCharities.length === 0 ? (
        <p>No pending charity applications.</p>
      ) : (
        <ul>
          {pendingCharities.map((charity) => (
            <li key={charity.id} className="mb-4 p-4 border rounded shadow">
              <h3 className="text-xl font-semibold">{charity.full_name}</h3>
              <p><strong>Email:</strong> {charity.email}</p>
              <p><strong>Website:</strong> <a href={charity.website_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{charity.website_url}</a></p>
              <p><strong>Description:</strong> {charity.description}</p>
              {charity.image && (
                <img src={charity.image} alt={`${charity.full_name} logo`} className="w-32 h-32 object-contain my-2" />
              )}
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => handleApprove(charity.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDecline(charity.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CharityApproval;
