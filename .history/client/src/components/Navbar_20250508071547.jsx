import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10">
            {/* Sample SVG Logo (You can replace this with your own SVG path) */}
            <svg
              src="src/assets/logo.svg"
              viewBox="0 0 64 64"
              fill="currentColor"
              className="h-full w-full text-yellow-300"
            >
              <circle
                cx="32"
                cy="32"
                r="30"
                stroke="white"
                strokeWidth="4"
                fill="currentColor"
              />
              <text
                x="50%"
                y="54%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="20"
                fill="white"
                fontWeight="bold"
              >
                TW
              </text>
            </svg>
          </div>
          <Link to="/" className="text-2xl font-bold tracking-wide">
            Tuinue WasichanaCCI
          </Link>
        </div>

        {/* Navigation */}
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
