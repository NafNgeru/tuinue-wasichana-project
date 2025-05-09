import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";

const Header = () => {
  return (
    <header className="bg-blue-700 text-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <Logo className="h-10 w-10" />
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide hover:text-blue-200 transition"
          >
            Tuinue WasichanaCCI
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-lg font-medium">
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
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-300 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
