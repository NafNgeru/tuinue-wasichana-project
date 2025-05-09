import React from 'react';
// import '../styles/Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { SiThreads } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 py-4 text-white text-center z-50">
    <div className="max-w-screen-lg mx-auto px-4 text-sm">
      <p className="mb-4">
        &copy; {new Date().getFullYear()} Tuinue Wasichana. All rights reserved.
      </p>

      <div className="flex justify-center gap-6 text-xl">
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
          className="hover:text-blue-500 transition"
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
          className="hover:text-pink-500 transition"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.threads.net/@yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          <SiThreads />
        </a>
      </div>
    </div>
</footer>

  );
};

export default Footer;