import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <section className="max-w-md mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Tuinue Wasichana</h1>
      <p className="mb-6">This is the home page of the charity donation platform.</p>
      <button
        onClick={handleLoginClick}
        className="bg-blue-600 text-white rounded px-6 py-3 hover:bg-blue-700"
      >
        Login
      </button>
    </section>
  );
};

export default HomePage;