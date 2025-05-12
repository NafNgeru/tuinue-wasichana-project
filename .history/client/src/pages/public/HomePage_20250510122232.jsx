import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/HomePage.css";
import HeroImage from "../../assets/hero.jpg";
import ImpactIcon1 from "../../assets/impact1.svg";
import ImpactIcon2 from "../../assets/impact2.svg";
import ImpactIcon3 from "../../assets/impact3.svg";
import EmpowermentImage from "../../assets/empowerment.jpg";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const navigate = useNavigate();
  const [heartbeatSpeed, setHeartbeatSpeed] = useState("slow");
  const donateButtonRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLoginClick = () => navigate("/login");
  const handleDonateClick = () => navigate("/donation");
  const handleVolunteerClick = () => navigate("/Charities");

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!donateButtonRef.current) return;
      const rect = donateButtonRef.current.getBoundingClientRect();
      const distX = Math.max(rect.left - e.clientX, e.clientX - rect.right, 0);
      const distY = Math.max(rect.top - e.clientY, e.clientY - rect.bottom, 0);
      const distance = Math.sqrt(distX * distX + distY * distY);
      setHeartbeatSpeed(distance < 100 ? "fast" : "slow");
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main className="font-sans bg-light-blue-100 text-gray-900">
      {/* HERO SECTION */}
      <section className="relative h-[83vh] md:h-[90vh] overflow-hidden">
        <img
          src={HeroImage}
          alt="Empowering girls"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-60"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Igniting Dreams, Forging Futures for Girls
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6 drop-shadow-md">
            Embark on a journey with us to champion dignity, secure health, and
            unlock boundless opportunities for girls across Sub-Saharan Africa.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <button
              ref={donateButtonRef}
              onClick={() => navigate("/Charities")}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-md font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300 transition-all"
            >
              <HeartIcon speed={heartbeatSpeed} /> Fuel the Change Now
            </button>

            {/* Register With Us Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-white hover:bg-gray-200 text-gray-900 px-5 py-3 rounded-md font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all flex items-center"
              >
                Commence Registration
              </button>
              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    marginTop: "0.5rem",
                    backgroundColor: "white",
                    border: "1px solid #e0e0e0",
                    borderRadius: "0.375rem",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    right: "0",
                    zIndex: "20",
                    width: "16rem",
                  }}
                >
                  <button
                    onClick={() => navigate("/register-individual-donor")}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "0.75rem 1.25rem",
                      color: "#4a5568",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#f7fafc")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    Register Individual Donor
                  </button>
                  <button
                    onClick={() => navigate("/register-organization-donor")}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "0.75rem 1.25rem",
                      color: "#4a5568",
                      backgroundColor: "transparent",
                      border: "none",
                      borderTop: "1px solid #e0e0e0",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#f7fafc")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    Register Organization Donor
                  </button>
                  <button
                    onClick={() => navigate("/register-individual-charity")}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "0.75rem 1.25rem",
                      color: "#4a5568",
                      backgroundColor: "transparent",
                      border: "none",
                      borderTop: "1px solid #e0e0e0",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#f7fafc")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    Register Individual Charity
                  </button>
                  <button
                    onClick={() => navigate("/register-organization-charity")}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "0.75rem 1.25rem",
                      color: "#4a5568",
                      backgroundColor: "transparent",
                      border: "none",
                      borderTop: "1px solid #e0e0e0",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#f7fafc")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    Register Organization Charity
                  </button>
                </div>
              )}
            </div>
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

      {/* EMPOWERMENT SECTION */}
      <section className="relative h-[80vh] md:h-[80vh] overflow-hidden">
        <img
          src={EmpowermentImage}
          alt="Empowered girls"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-50"
        />
        <div className="relative z-10 flex items-center justify-center h-full px-6 text-white text-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
              Ready to Be a Force for Change?
            </h2>
            <p className="text-lg md:text-xl mb-6 drop-shadow-md">
              Your invaluable contribution can ignite a spark in a girl's life,
              empowering her to stay in school and sculpt a future brimming with
              promise.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => navigate("/about")}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Know About Us
              </button>
              {/*
              <button
                onClick={handleVolunteerClick}
                className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-md font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                View Charities
              </button>
              */}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-10">
          Voices of Hope and Transformation
        </h2>
        <div className="max-w-3xl mx-auto px-4 space-y-10">
          {[
            {
              quote:
                "Tuinue Wasichana's unwavering support has been a lifeline for my daughter. She's blossomed into a confident and thriving student.",
              name: "— Amina J., Grateful Parent",
            },
            {
              quote:
                "I wholeheartedly believe in their powerful mission. Every donation is a seed of change that cultivates tangible impact in the lives of these bright young girls.",
              name: "— David L., Passionate Supporter",
            },
            {
              quote:
                "Receiving sanitary pads consistently has been a game-changer for my education. My deepest gratitude!",
              name: "— Fatuma K., Empowered Student",
            },
          ].map(({ quote, name }, i) => (
            <blockquote
              key={i}
              className="bg-white shadow-lg rounded-2xl p-8 relative transition-transform duration-300 hover:scale-[1.02]"
            >
              <p className="text-xl italic text-gray-700 mb-4 leading-relaxed">
                “{quote}”
              </p>
              <footer className="text-sm font-medium text-blue-500">
                {name}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-12 bg-white text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Connect With Us
        </h2>
        <p className="text-gray-700 mb-8">
          We're here to answer your questions and support your journey in making
          a difference.
        </p>
        <div className="flex flex-wrap justify-center gap-6 px-4 max-w-4xl mx-auto">
          {[
            {
              title: "General Inquiries",
              contact: "info@tuinuewasichanacci.org",
              phone: "+254 700 123456",
            },
            {
              title: "Volunteer Opportunities",
              contact: "volunteer@tuinuewasichanacci.org",
              phone: "+254 701 654321",
            },
            {
              title: "Partnerships & Support",
              contact: "partners@tuinuewasichanacci.org",
              phone: "+254 702 987654",
            },
          ].map(({ title, contact, phone }, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg shadow-md p-6 w-80 text-left hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {title}
              </h3>
              <p className="text-gray-700 mb-1">
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${contact}`}
                  className="text-blue-600 underline"
                >
                  {contact}
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong>{" "}
                <a href={`tel:${phone}`} className="text-blue-600 underline">
                  {phone}
                </a>
              </p>
            </div>
          ))}
        </div>
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
         2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.05
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
