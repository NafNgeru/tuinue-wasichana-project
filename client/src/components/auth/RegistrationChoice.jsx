import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

const RegistrationChoice = () => {
  const navigate = useNavigate();

  const handleChoice = (type, userType) => {
    if (type === 'donor') {
      navigate(`/register/donor/${userType}`);
    } else if (type === 'charity') {
      navigate(`/register/charity/${userType}`);
    }
  };

  return (
    <section className="auth-section max-w-md mx-auto p-4 text-center">
      <h2 className="auth-title">Register as Donor or Charity</h2>
      <div className="mb-6">
        <h3 className="auth-subtitle">Donor Registration</h3>
        <button
          onClick={() => handleChoice('donor', 'individual')}
          className="auth-button mr-2"
        >
          Individual
        </button>
        <button
          onClick={() => handleChoice('donor', 'organization')}
          className="auth-button"
        >
          Organization
        </button>
      </div>
      <div>
        <h3 className="auth-subtitle">Charity Registration</h3>
        <button
          onClick={() => handleChoice('charity', 'individual')}
          className="auth-button mr-2"
        >
          Individual
        </button>
        <button
          onClick={() => handleChoice('charity', 'organization')}
          className="auth-button"
        >
          Organization
        </button>
      </div>
    </section>
  );
};

export default RegistrationChoice;
