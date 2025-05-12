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
  const handleProgramClick = () => navigate("/programs");
  const handleVolunteerClick = () => navigate("/volunteer");

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
      {/* HERO SECTION */}
      <section className="relative text-center py-16 bg-blue-50">
        <div className="rounded-xl overflow-hidden shadow-xl border-4 border-white w-full md:w-5/6 lg:w-4/5 mx-auto">
          <img
            src={HeroImage}
            alt="Vibrant banner showcasing the spirit of empowerment"
            className="w-full h-[800px] object-cover brightness-75 rounded-xl"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Igniting Dreams, Forging Futures for Girls
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mb-6">
            Embark on a journey with us to champion dignity, secure health, and
            unlock boundless opportunities for girls across Sub-Saharan Africa.
          </p>
          <div className="flex gap-3 md:gap-4 flex-wrap justify-center">
            <button
              ref={donateButtonRef}
              onClick={handleDonateClick}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-md font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            >
              <HeartIcon speed={heartbeatSpeed} /> Fuel the Change Now
            </button>
            <button
              onClick={handleAboutClick}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-5 py-3 rounded-md font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Discover Our Impact
            </button>
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="py-12 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            Our Core Pillars of Empowerment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8">
            {[
              {
                icon: ImpactIcon1,
                title: "Upholding Menstrual Dignity",
                desc: "Empowering girls with vital access to sanitary products and crucial education, ensuring they can attend school with unwavering dignity.",
              },
              {
                icon: ImpactIcon2,
                title: "Elevating Through Education",
                desc: "Providing robust educational resources and transformative programs that pave the way for girls to achieve academic excellence and unlock their full potential.",
              },
              {
                icon: ImpactIcon3,
                title: "Igniting Leadership Potential",
                desc: "Conducting dynamic workshops and impactful mentorship programs designed to cultivate unshakeable confidence and formidable leadership skills in girls.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition duration-300"
              >
                <img
                  src={item.icon}
                  alt={`Symbol of ${item.title}`}
                  className="w-12 h-12 mb-3"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="py-12 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Witness Our Growing Ripple Effect
        </h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 px-4 md:px-8">
          {[
            { number: "3,200+", label: "Girls Empowered", color: "blue" },
            {
              number: "45,000+",
              label: "Life-Changing Pads Distributed",
              color: "green",
            },
            {
              number: "95%",
              label: "Sustained School Attendance",
              color: "orange",
            },
          ].map(({ number, label, color }, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md p-6 w-64 hover:shadow-xl transition duration-300"
            >
              <div className={`text-2xl font-bold text-${color}-600 mb-2`}>
                {number}
              </div>
              <p className="text-gray-700 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="relative py-16 bg-blue-100">
        <div className="rounded-xl overflow-hidden shadow-xl border-4 border-white w-full md:w-5/6 lg:w-4/5 mx-auto">
          <img
            src={EmpowermentImage}
            alt="Inspiring scene of empowered girls"
            className="w-full h-auto object-cover brightness-50 rounded-xl"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Be a Force for Change?
            </h2>
            <p className="text-lg text-white mb-6">
              Your invaluable contribution can ignite a spark in a girl's life,
              empowering her to stay in school and sculpt a future brimming with
              promise.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleDonateClick}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
              >
                Donate Now and Transform Lives
              </button>
              <button
                onClick={handleVolunteerClick}
                className="bg-white hover:bg-gray-100 text-blue-500 px-6 py-3 rounded-md font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                Join Our Dedicated Volunteers
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-12 bg-gray-50 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Voices of Hope and Transformation
        </h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto px-4">
          {[
            {
              quote:
                "“Tuinue Wasichana's unwavering support has been a lifeline for my daughter. She's blossomed into a confident and thriving student.”",
              name: "Amina J., Grateful Parent",
            },
            {
              quote:
                "“I wholeheartedly believe in their powerful mission. Every donation is a seed of change that cultivates tangible impact in the lives of these bright young girls.”",
              name: "David L., Passionate Supporter",
            },
            {
              quote:
                "“Receiving sanitary pads consistently has been a game-changer for my education. My deepest gratitude!”",
              name: "Fatuma K., Empowered Student",
            },
          ].map(({ quote, name }, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md p-6 w-80 text-left hover:shadow-xl transition duration-300"
            >
              <p className="italic text-gray-700 mb-3">{quote}</p>
              <p className="font-semibold text-blue-500">- {name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section className="py-12 bg-white text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Explore Our Life-Changing Initiatives
        </h2>
        <p className="text-gray-700 mb-6">
          Delve into the diverse and impactful ways we are nurturing the
          potential of girls and discover how you can become an integral part of
          this vital movement.
        </p>
        <button
          onClick={handleProgramClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Uncover Our Programs
        </button>
      </section>
    </main>
  );
};

const HeartIcon = ({ speed }) => (
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
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
      2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
      C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42
      22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    />
    <style>{`
      .heart-icon { animation-fill-mode: forwards; }
      .heartbeat-slow { animation: heartbeat 2s infinite; }
      .heartbeat-fast { animation: heartbeat 0.5s infinite; }
      @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
      }
    `}</style>
  </svg>
);

export default HomePage;