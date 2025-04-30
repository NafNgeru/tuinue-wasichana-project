import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <section className="w-full min-h-screen p-4 text-center flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Tuinue Wasichana</h1>
      <p className="mb-6 max-w-3xl">This is the home page of the charity donation platform.</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleLoginClick}
          className="bg-blue-600 text-white rounded px-6 py-3 hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </section>
  );
};

export default HomePage;
