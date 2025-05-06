import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [heartbeatSpeed, setHeartbeatSpeed] = useState('slow');
  const donateButtonRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleDonateClick = () => {
    navigate('/charities'); // Redirect to charities listing page
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!donateButtonRef.current) return;
      const rect = donateButtonRef.current.getBoundingClientRect();
      const distX = Math.max(rect.left - e.clientX, e.clientX - rect.right, 0);
      const distY = Math.max(rect.top - e.clientY, e.clientY - rect.bottom, 0);
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < 100) {
        setHeartbeatSpeed('fast');
      } else {
        setHeartbeatSpeed('slow');
        setShowPopup(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="max-w-md mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Tuinue Wasichana</h1>
      <p className="mb-6">This is the home page of the charity donation platform.</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleLoginClick}
          className="bg-blue-600 text-white rounded px-6 py-3 hover:bg-blue-700"
        >
          Login
        </button>
        <button
          ref={donateButtonRef}
          onClick={handleDonateClick}
          className="bg-red-600 text-white rounded px-6 py-3 hover:bg-red-700 flex items-center gap-2"
          style={{ position: 'relative' }}
        >
          <HeartIcon speed={heartbeatSpeed} />
          Donate
        </button>
      </div>
    </section>
  );
};

const HeartIcon = ({ speed }) => {
  return (
    <svg
      className={`heart-icon ${speed === 'fast' ? 'heartbeat-fast' : 'heartbeat-slow'}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="red"
      width="24px"
      height="24px"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      <style>{`
        .heart-icon {
          animation-fill-mode: forwards;
        }
        .heartbeat-slow {
          animation: heartbeat 2s infinite;
        }
        .heartbeat-fast {
          animation: heartbeat 0.5s infinite;
        }
        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
        }
      `}</style>
    </svg>
  );
};

export default HomePage;
