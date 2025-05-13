import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CharityCard from '../../components/CharityCard';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';
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
    } catch (err) {
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
      await axios.delete(`http://localhost:5000/charities/${id}`);
      setCharities((prev) => prev.filter((charity) => charity.id !== id));
    } catch (err) {
      setError('Failed to delete charity.');
    }
  };

  if (loading) return <p>Loading charities...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <>
      {/* <Navbar /> */}
      <section className="delete-charity-page p-6 max-w-4xl mx-auto">
        <div className="mb-4">
          <Link to="/admin" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Back to Dashboard
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-4">Delete Charities</h2>
        {charities.length === 0 ? (
          <p>No charities available.</p>
        ) : (
          <ul>
            {charities.map((charity) => (
              <CharityCard key={charity.id} charity={charity} onDelete={handleDelete} />
            ))}
          </ul>
        )}
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default DeleteCharity;
