import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DeleteCharity = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/charities/');
        setCharities(response.data);
      } catch (err) {
        console.error('Error fetching charities:', err);
        setError('Failed to fetch charities.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharities();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this charity?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/charities/${id}`);
      setCharities((prevCharities) => prevCharities.filter((charity) => charity.id !== id));
    } catch (err) {
      console.error('Error deleting charity:', err);
      setError('Failed to delete charity.');
    }
  };

  if (loading) return <p>Loading charities...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <section className="delete-charity-page p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          to="/admin"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          ← Back to Admin Dashboard
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-4">Delete Charities</h2>

      {charities.length === 0 ? (
        <p>No charities available.</p>
      ) : (
        <ul className="space-y-4">
          {charities.map((charity) => (
            <li
              key={charity.id}
              className="p-4 border rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{charity.full_name}</h3>
                <p>{charity.description}</p>
              </div>
              <button
                onClick={() => handleDelete(charity.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default DeleteCharity;
