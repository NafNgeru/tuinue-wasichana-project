import React, { useEffect, useState } from 'react';
import { api } from '../../api';
import { Link } from 'react-router-dom';
import CharityCard from '../../components/CharityCard';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';
import '../../styles/Admin.css';

const Modal = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
      <p className="text-gray-800 mb-4">{message}</p>
      <div className="flex justify-center gap-4">
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          onClick={onConfirm}
        >
          Yes, Delete
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

const DeleteCharity = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [charityToDelete, setCharityToDelete] = useState(null);

  const fetchCharities = async () => {
    try {
      const response = await api('/charities/');
      setCharities(response);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch charities.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharities();
  }, []);

  const handleDelete = (id) => {
    setCharityToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api(`/charities/${charityToDelete}`, { method: 'DELETE' });
      setCharities((prev) => prev.filter((charity) => charity.id !== charityToDelete));
    } catch (err) {
      setError('Failed to delete charity.');
    } finally {
      setShowDeleteModal(false);
      setCharityToDelete(null);
    }
  };

  if (loading) return <p>Loading charities...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <>

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

 
  {showDeleteModal && (
    <Modal
      message="Are you sure you want to delete this charity?"
      onConfirm={confirmDelete}
      onCancel={() => setShowDeleteModal(false)}
    />
  )}

</>
  );
};

export default DeleteCharity;