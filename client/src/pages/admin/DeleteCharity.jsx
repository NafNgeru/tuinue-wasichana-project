import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CharityCard from '../../components/CharityCard';

import '../../styles/Admin.css';

const DeleteCharity = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCharities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/charities/');
      setCharities(response.data);
      setLoading(false);
    } catch {
      setError('Failed to fetch charities.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharities();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this charity?')) return;
    try {
      await axios.delete(`http://localhost:5000/admin/${id}/delete`);
      setCharities((prev) => prev.filter((charity) => charity.id !== id));
    } catch {
      setError('Failed to delete charity.');
    }
  };

  if (loading) return <p>Loading charities...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <>
      <section className="delete-charity-page p-4 max-w-5xl mx-auto">
        <div className="mb-6 text-center">
          <Link to="/admin" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Back to Dashboard
          </Link>
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center">Delete Charities</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {charities.map((charity) => (
            <CharityCard key={charity.id} charity={charity} onDelete={handleDelete} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default DeleteCharity;
