import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="text-2xl font-extrabold tracking-wide">
          <Link to="/">Tuinue WasichanaCCI</Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6 text-lg font-medium">
          <Link to="/" className="hover:text-blue-200 transition duration-200">
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-200 transition duration-200"
          >
            About
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-300 transition duration-200"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
