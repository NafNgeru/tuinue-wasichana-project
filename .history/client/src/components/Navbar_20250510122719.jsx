import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Title */}
        <h1 className="text-3xl font-bold tracking-wide text-white">
          Tuinue Wasichana
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <Link
            to="/"
            className="hover:text-yellow-400 transition duration-300 ease-in-out"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-yellow-400 transition duration-300 ease-in-out"
          >
            About
          </Link>
          <Link
            to="/charities"
            className="hover:text-yellow-400 transition duration-300 ease-in-out"
          >
            Charities
          </Link>
          <Link
            to="/login"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition duration-300 ease-in-out"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 px-6`}
      >
        <nav className="flex flex-col gap-6">
          <Link
            to="/"
            className="hover:text-yellow-400 transition duration-300 ease-in-out"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-yellow-400 transition duration-300 ease-in-out"
            onClick={toggleMobileMenu}
          >
            About
          </Link>
          <Link
            to="/charities"
            className="hover:text-yellow-400 transition duration-300 ease-in-out"
            onClick={toggleMobileMenu}
          >
            Charities
          </Link>
          <Link
            to="/login"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition duration-300 ease-in-out"
            onClick={toggleMobileMenu}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
