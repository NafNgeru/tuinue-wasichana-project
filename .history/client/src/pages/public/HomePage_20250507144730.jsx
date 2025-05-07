import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [heartbeatSpeed, setHeartbeatSpeed] = useState("slow");
  const donateButtonRef = useRef(null);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleDonateClick = () => {
    navigate("/donation");
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!donateButtonRef.current) return;
      const rect = donateButtonRef.current.getBoundingClientRect();
      const distX = Math.max(rect.left - e.clientX, e.clientX - rect.right, 0);
      const distY = Math.max(rect.top - e.clientY, e.clientY - rect.bottom, 0);
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < 100) {
        setHeartbeatSpeed("fast");
      } else {
        setHeartbeatSpeed("slow");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="relative text-center">
        <img
          src="https://images.unsplash.com/photo-1575311373936-965d6e49c6f4?auto=format&fit=crop&w=1950&q=80"
          alt="Hero Banner"
          className="w-full h-[400px] object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/50">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tuinue WasichanaCCI
          </h1>
          <p className="text-xl max-w-xl px-4">
            Empowering girls in Sub-Saharan Africa through menstrual health
            support and dignity.
          </p>
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleLoginClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow-md transition"
            >
              Login
            </button>
            <button
              ref={donateButtonRef}
              onClick={handleDonateClick}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded shadow-md transition flex items-center gap-2"
            >
              <HeartIcon speed={heartbeatSpeed} />
              Donate
            </button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Why It Matters</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-700">
          Millions of school-going girls miss classes due to lack of menstrual
          products. Tuinue WasichanaCCI ensures every girl has access to safe
          hygiene support and education continuity.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-white text-center">
        <h3 className="text-2xl font-semibold mb-6">How It Works</h3>
        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
          {[
            { step: "1", text: "Choose your donation amount" },
            { step: "2", text: "Select one-time or recurring" },
            { step: "3", text: "Donate securely via PayPal" },
          ].map(({ step, text }) => (
            <div
              key={step}
              className="bg-pink-200 p-6 rounded-xl w-64 shadow-md"
            >
              <div className="text-4xl font-bold text-pink-700 mb-2">
                {step}
              </div>
              <p className="text-lg text-gray-800">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

const HeartIcon = ({ speed }) => {
  return (
    <svg
      className={`heart-icon ${
        speed === "fast" ? "heartbeat-fast" : "heartbeat-slow"
      }`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      width="24px"
      height="24px"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
               4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
               14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
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
