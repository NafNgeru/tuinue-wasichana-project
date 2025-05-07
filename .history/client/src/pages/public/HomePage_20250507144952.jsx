import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [heartbeatSpeed, setHeartbeatSpeed] = useState("slow");
  const donateButtonRef = useRef(null);

  const handleLoginClick = () => navigate("/login");
  const handleDonateClick = () => navigate("/donation");
  const handleAboutClick = () => navigate("/about");

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!donateButtonRef.current) return;
      const rect = donateButtonRef.current.getBoundingClientRect();
      const distX = Math.max(rect.left - e.clientX, e.clientX - rect.right, 0);
      const distY = Math.max(rect.top - e.clientY, e.clientY - rect.bottom, 0);
      const distance = Math.sqrt(distX * distX + distY * distY);
      setHeartbeatSpeed(distance < 100 ? "fast" : "slow");
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="font-sans bg-white text-gray-800">
      {/* Hero Banner */}
      <section className="relative text-center">
        <img
          src="https://images.unsplash.com/photo-1614423066005-41c93c3e40ae?auto=format&fit=crop&w=1950&q=80"
          alt="Hero"
          className="w-full h-[500px] object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Tuinue WasichanaCCI
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl">
            Uplifting girls across Sub-Saharan Africa with dignity, health, and
            opportunity.
          </p>
          <div className="flex gap-4 mt-6 flex-wrap justify-center">
            <button
              onClick={handleLoginClick}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Login
            </button>
            <button
              ref={donateButtonRef}
              onClick={handleDonateClick}
              className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 flex items-center gap-2"
            >
              <HeartIcon speed={heartbeatSpeed} />
              Donate Now
            </button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-6">Our Impact So Far</h2>
        <div className="flex flex-wrap justify-center gap-8 text-xl font-medium">
          <div className="bg-white rounded-xl shadow p-6 w-60">
            🎒 3,200+ Girls Supported
          </div>
          <div className="bg-white rounded-xl shadow p-6 w-60">
            🩸 45,000+ Pads Distributed
          </div>
          <div className="bg-white rounded-xl shadow p-6 w-60">
            📚 95% School Attendance Retention
          </div>
        </div>
      </section>

      {/* CTA Emotion Block */}
      <section className="relative h-[350px] mt-10">
        <img
          src="https://images.unsplash.com/photo-1583225154085-3b768b95b61b?auto=format&fit=crop&w=1950&q=80"
          alt="Girls Empowerment"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-4">
            Every Girl Deserves Dignity
          </h2>
          <p className="text-lg text-white max-w-xl mb-4">
            Help us provide sanitary products and education support to girls in
            need. Be the reason someone finishes school.
          </p>
          <button
            onClick={handleDonateClick}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded shadow-lg"
          >
            Make a Difference
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 bg-pink-50 text-center">
        <h2 className="text-3xl font-bold mb-6">
          What Donors & Beneficiaries Say
        </h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {[
            {
              quote:
                "“Tuinue Wasichana changed my daughter's life. Now she never misses school.”",
              name: "Grace M., Parent",
            },
            {
              quote:
                "“Supporting this cause is the best decision I ever made.”",
              name: "Mark K., Monthly Donor",
            },
            {
              quote: "“Now I can go to school every day. Thank you!”",
              name: "Amina, Age 14",
            },
          ].map(({ quote, name }) => (
            <div key={name} className="bg-white p-6 rounded-xl shadow-md w-80">
              <p className="italic text-gray-700">"{quote}"</p>
              <p className="mt-4 font-semibold text-pink-700">- {name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Learn More CTA */}
      <section className="py-12 text-center">
        <h3 className="text-2xl mb-4 font-semibold">
          Want to learn how it works?
        </h3>
        <button
          onClick={handleAboutClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded"
        >
          Learn More
        </button>
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
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
               2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
               C13.09 3.81 14.76 3 16.5 3 
               19.58 3 22 5.42 22 8.5c0 
               3.78-3.4 6.86-8.55 11.54L12 21.35z"
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
