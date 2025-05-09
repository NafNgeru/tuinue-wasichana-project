import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import back1 from '../../assets/images/back1.jpeg';
import back2 from '../../assets/images/back2.jpeg';
import back3 from '../../assets/images/back3.jpg';
import back4 from '../../assets/images/back4.jpg';

const images = [back1, back2, back3, back4];

const HomePage = () => {
  const navigate = useNavigate();
  const [heartbeatSpeed, setHeartbeatSpeed] = useState('slow');
  const donateButtonRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleDonateClick = () => {
    navigate('/charities');
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!donateButtonRef.current) return;
      const rect = donateButtonRef.current.getBoundingClientRect();
      const distX = Math.max(rect.left - e.clientX, e.clientX - rect.right, 0);
      const distY = Math.max(rect.top - e.clientY, e.clientY - rect.bottom, 0);
      const distance = Math.sqrt(distX * distX + distY * distY);

      setHeartbeatSpeed(distance < 100 ? 'fast' : 'slow');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setFade(false);
      setTimeout(() => setFade(true), 5000); // matches 1s transition
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevIndex = (currentIndex - 1 + images.length) % images.length;

  const baseStyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 1s ease-in-out',
    height: '100vh',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -2,
  };

  return (
    <section
      className="p-4 text-center"
      style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}
    >
      <div
        style={{
          ...baseStyle,
          backgroundImage: `url(${images[prevIndex]})`,
          opacity: fade ? 0 : 1,
        }}
      />
      <div
        style={{
          ...baseStyle,
          backgroundImage: `url(${images[currentIndex]})`,
          opacity: fade ? 1 : 0,
        }}
      />

      <h1 className="text-3xl font-bold mb-4" style={{ color: 'white', position: 'relative', zIndex: 1 }}>
        Welcome to Tuinue Wasichana
      </h1>
      <p className="mb-6" style={{ color: 'white', position: 'relative', zIndex: 1 }}>
        This is the home page of the charity donation platform.
      </p>

      <div className="flex justify-center gap-4" style={{ position: 'relative', zIndex: 1 }}>
        <button
          onClick={handleLoginClick}
          className="bg-blue-600 text-white rounded px-6 py-3 hover:bg-blue-700"
          aria-label="Login to your account"
        >
          Login
        </button>
        <button
          ref={donateButtonRef}
          onClick={handleDonateClick}
          className="bg-red-600 text-white rounded px-6 py-3 hover:bg-red-700 flex items-center gap-2"
          aria-label="Donate to a charity"
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
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
        2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 
        2.09C13.09 3.81 14.76 3 16.5 3 
        19.58 3 22 5.42 22 8.5c0 3.78-3.4 
        6.86-8.55 11.54L12 21.35z"
      />
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
