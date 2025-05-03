import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [isNear, setIsNear] = useState(false);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleDonationClick = () => {
    navigate('/payment');
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const button = document.getElementById('donation-button');
      if (!button) return;
      const rect = button.getBoundingClientRect();
      const distX = Math.max(rect.left - e.clientX, e.clientX - rect.right, 0);
      const distY = Math.max(rect.top - e.clientY, e.clientY - rect.bottom, 0);
      const distance = Math.sqrt(distX * distX + distY * distY);
      setIsNear(distance < 100);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="max-w-md mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Tuinue Wasichana</h1>
      <p className="mb-6">This is the home page of the charity donation platform.</p>
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={handleLoginClick}
          className="bg-blue-600 text-white rounded px-6 py-3 hover:bg-blue-700"
        >
          Login
        </button>
      </div>
      <div className="flex justify-center">
        <button
          id="donation-button"
          onClick={handleDonationClick}
          className={`text-5xl transition-transform duration-300 ${
            isNear ? 'donation-beat-fast' : 'donation-beat'
          }`}
          aria-label="Donate"
          title="Donate"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ❤️
        </button>
      </div>
      <style>{`
        @keyframes beat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes beat-fast {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.4); }
        }
        .donation-beat {
          animation: beat 1s infinite;
        }
        .donation-beat-fast {
          animation: beat-fast 0.5s infinite;
        }
      `}</style>
    </section>
  );
};

export default HomePage;
