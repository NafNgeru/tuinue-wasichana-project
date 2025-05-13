import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { SiThreads } from 'react-icons/si';

const Footer = () => {
  return (
    <>
      {/* CONTACT SECTION */}
      <section className="py-12 bg-gray-800 text-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Connect With Us</h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          We're here to answer your questions and support your journey in making a difference.
        </p>
        <div className="flex flex-wrap justify-center gap-6 px-4 max-w-5xl mx-auto">
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
              className="bg-gray-700 rounded-xl shadow-lg p-6 w-80 text-left hover:shadow-2xl hover:shadow-white transition duration-300"
            >
              <h3 className="text-xl font-bold text-black mb-2">{title}</h3>
              <p className="text-gray-200 mb-1">
                <span className="text-black"><strong>Email:</strong></span> 
                <a
                  href={`mailto:${contact}`}
                  className="text-blue-300 hover:underline"
                >
                  {contact}
                </a>
              </p>
              <p className="text-gray-200">
                <span className="text-black"><strong>Phone:</strong></span> 
                <a href={`tel:${phone}`} className="text-blue-300 hover:underline">
                  {phone}
                </a>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-gray-800 py-6 text-white text-center border-t border-gray-700">
        <div className="max-w-screen-lg mx-auto px-4 text-sm">
          <p className="mb-4 text-gray-300">
            &copy; {new Date().getFullYear()} Tuinue Wasichana. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 text-2xl">
            <a
              href="https://wa.me/254712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.threads.net/@yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
            >
              <SiThreads />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export const HeartIcon = ({ speed }) => (
  <svg
    className={`heart-icon ${
      speed === 'fast' ? 'heartbeat-fast' : 'heartbeat-slow'
    }`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="white"
    width="20px"
    height="20px"
    style={{ verticalAlign: 'middle' }}
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

export default Footer;
