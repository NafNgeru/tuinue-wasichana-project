import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationChoice = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-md mx-auto p-4 auth-container text-center">
      <h2 className="text-2xl font-bold mb-6">Choose Registration Type</h2>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Donor Registration</h3>
        <button
          onClick={() => navigate('/register/donor/individual')}
          className="bg-blue-600 text-white rounded px-6 py-3 hover:bg-blue-700"
        >
          Individual Donor
        </button>
        <button
          onClick={() => navigate('/register/donor/organization')}
          className="bg-blue-600 text-white rounded px-6 py-3 hover:bg-blue-700"
        >
          Organization Donor
        </button>

        <h3 className="text-xl font-semibold mt-6">Charity Registration</h3>
        <button
          onClick={() => navigate('/register/charity/individual')}
          className="bg-green-600 text-white rounded px-6 py-3 hover:bg-green-700"
        >
          Individual Charity
        </button>
        <button
          onClick={() => navigate('/register/charity/organization')}
          className="bg-green-600 text-white rounded px-6 py-3 hover:bg-green-700"
        >
          Organization Charity
        </button>

        <button
          onClick={() => navigate('/login')}
          className="underline text-blue-600 hover:text-blue-800 mt-6"
        >
          Back to Login
        </button>
      </div>
    </section>
  );
};

export default RegistrationChoice;
