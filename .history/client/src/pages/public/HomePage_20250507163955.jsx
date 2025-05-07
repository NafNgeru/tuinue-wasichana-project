import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/HomePage.css";
import HeroImage from "../../assets/hero.jpg";
import ImpactIcon1 from "../../assets/impact1.svg";
import ImpactIcon2 from "../../assets/impact2.svg";
import ImpactIcon3 from "../../assets/impact3.svg";
import EmpowermentImage from "../../assets/empowerment.jpg";

const HomePage = () => {
  const navigate = useNavigate();
  const [heartbeatSpeed, setHeartbeatSpeed] = useState("slow");
  const donateButtonRef = useRef(null);

  const handleLoginClick = () => navigate("/login");
  const handleDonateClick = () => navigate("/donation");
  const handleAboutClick = () => navigate("/about");
  const handleProgramClick = () => navigate("/programs"); // Example for a programs page
  const handleVolunteerClick = () => navigate("/volunteer"); // Example for a volunteer page

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
    <main className="font-sans bg-gray-50 text-gray-900">
      {/* Hero Banner */}
      <section className="relative text-center py-16 md:py-24 bg-blue-50">
        <img
          src={HeroImage}
          alt="Empowering Girls"
          className="w-full h-[450px] object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Uplifting Girls, Transforming Futures
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mb-6">
            Join us in our mission to provide dignity, health, and opportunity
            to girls across Sub-Saharan Africa.
          </p>
          <div className="flex gap-3 md:gap-4 flex-wrap justify-center">
            <button
              onClick={handleDonateClick}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-md font-semibold shadow-md"
            >
              <HeartIcon speed={heartbeatSpeed} /> Donate Now
            </button>
            <button
              onClick={handleAboutClick}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-5 py-3 rounded-md font-semibold shadow-md"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Our Focus/Services Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            Our Key Focus Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8">
            <div className="bg-gray-50 rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="w-12 h-12 mb-3">
                <img
                  src={ImpactIcon1}
                  alt="Menstrual Health Icon"
                  className="w-full h-full text-blue-500"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Menstrual Health
              </h3>
              <p className="text-gray-700">
                Providing access to sanitary products and education to ensure
                girls can attend school with dignity.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="w-12 h-12 mb-3">
                <img
                  src={ImpactIcon2}
                  alt="Education Support Icon"
                  className="w-full h-full text-green-500"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Education Support
              </h3>
              <p className="text-gray-700">
                Supporting girls with educational resources and programs to help
                them succeed academically.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="w-12 h-12 mb-3">
                <img
                  src={ImpactIcon3}
                  alt="Empowerment Programs Icon"
                  className="w-full h-full text-orange-500"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Empowerment Programs
              </h3>
              <p className="text-gray-700">
                Conducting workshops and mentorship programs to build confidence
                and leadership skills in girls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Our Growing Impact
        </h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 px-4 md:px-8">
          <div className="bg-white rounded-lg shadow-md p-6 w-64">
            <div className="text-2xl font-bold text-blue-600 mb-2">3,200+</div>
            <p className="text-gray-700 font-medium">Girls Supported</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 w-64">
            <div className="text-2xl font-bold text-green-600 mb-2">
              45,000+
            </div>
            <p className="text-gray-700 font-medium">Pads Distributed</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 w-64">
            <div className="text-2xl font-bold text-orange-600 mb-2">95%</div>
            <p className="text-gray-700 font-medium">
              School Attendance Retention
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-16 bg-blue-100">
        <img
          src={EmpowermentImage}
          alt="Support Girls"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Make a Real Difference?
            </h2>
            <p className="text-lg text-white mb-6">
              Your contribution can empower a girl to stay in school and build a
              brighter future. Join our community of change-makers.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleDonateClick}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-semibold shadow-lg"
              >
                Donate Now
              </button>
              <button
                onClick={handleVolunteerClick}
                className="bg-white hover:bg-gray-100 text-blue-500 px-6 py-3 rounded-md font-semibold shadow-lg"
              >
                Volunteer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-50 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Hear From Our Community
        </h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto px-4">
          {[
            {
              quote:
                "“Tuinue Wasichana's support has been invaluable for my daughter. She's now confident and thriving in school.”",
              name: "Amina J., Parent",
            },
            {
              quote:
                "“I believe in their mission. Every donation makes a tangible impact on the lives of these young girls.”",
              name: "David L., Donor",
            },
            {
              quote:
                "“Getting sanitary pads regularly has made a huge difference in my education. Thank you!”",
              name: "Fatuma K., Student",
            },
          ].map(({ quote, name }, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 w-80 text-left"
            >
              <p className="italic text-gray-700 mb-3">"{quote}"</p>
              <p className="font-semibold text-blue-500">- {name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Learn More / Programs Section */}
      <section className="py-12 bg-white text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Explore Our Programs
        </h2>
        <p className="text-gray-700 mb-6">
          Discover the various ways we are empowering girls and how you can get
          involved.
        </p>
        <button
          onClick={handleProgramClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-semibold shadow-md"
        >
          Learn About Our Programs
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
      width="20px"
      height="20px"
      style={{ verticalAlign: "middle" }}
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
            transform: scale(1.2);
          }
        }
      `}</style>
    </svg>
  );
};

export default HomePage;
