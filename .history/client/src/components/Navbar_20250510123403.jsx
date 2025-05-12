import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-blue-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-800">Tuinue Wasichana</h1>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-blue-700 hover:text-blue-900 transition">
            Home
          </Link>
          <Link
            to="/about"
            className="text-blue-700 hover:text-blue-900 transition"
          >
            About
          </Link>
          <Link
            to="/charities"
            className="text-blue-700 hover:text-blue-900 transition"
          >
            Charities
          </Link>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-blue-800 text-2xl focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-blue-50">
          <Link to="/" className="block text-blue-700 hover:text-blue-900">
            Home
          </Link>
          <Link to="/about" className="block text-blue-700 hover:text-blue-900">
            About
          </Link>
          <Link
            to="/charities"
            className="block text-blue-700 hover:text-blue-900"
          >
            Charities
          </Link>
          <Link
            to="/login"
            className="block text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
