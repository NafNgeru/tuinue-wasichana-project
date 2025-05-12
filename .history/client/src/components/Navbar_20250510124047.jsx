import React from "react";
import "../styles/Header.css"; // You might not need this anymore with Tailwind

// Import your logo image
import logo from "../../assets/sha-logo.png"; // Adjust the path as needed

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Left Side: Logo and potentially site title */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Social Health Authority Logo"
            className="h-10 mr-4"
          />
          {/* Optional: <span className="font-semibold text-lg text-gray-800">Your Site Name</span> */}
        </div>

        {/* Middle: Navigation Links (Hidden on small screens) */}
        <nav className="hidden md:flex space-x-6">
          <a href="/overview" className="text-gray-700 hover:text-blue-600">
            Overview
          </a>
          <a href="/faqs" className="text-gray-700 hover:text-blue-600">
            FAQs
          </a>
          <a href="/resources" className="text-gray-700 hover:text-blue-600">
            Resources
          </a>
        </nav>

        {/* Right Side: Buttons */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center">
              Related sites
              <svg
                className="fill-current h-4 w-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
            {/* Optional: Dropdown for related sites (You'll need to implement the toggle logic) */}
            {/* <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-10">
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Site 1</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Site 2</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Site 3</a>
            </div> */}
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center">
            Register
            <svg
              className="fill-current h-4 w-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-transparent border border-blue-600 text-blue-600 font-semibold py-2 px-4 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Login
          </button>
        </div>
      </div>

      {/* Mobile Navigation (Hidden by default, can be toggled with JavaScript) */}
      <div className="md:hidden bg-gray-100 py-2 px-4">
        <a
          href="/overview"
          className="block py-2 text-gray-700 hover:text-blue-600"
        >
          Overview
        </a>
        <a
          href="/faqs"
          className="block py-2 text-gray-700 hover:text-blue-600"
        >
          FAQs
        </a>
        <a
          href="/resources"
          className="block py-2 text-gray-700 hover:text-blue-600"
        >
          Resources
        </a>
        {/* Add mobile register/login buttons here if needed */}
        <button className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
          Register
        </button>
        <button
          onClick={() => navigate("/login")}
          className="block w-full bg-transparent border border-blue-600 text-blue-600 font-semibold py-2 rounded mt-2 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
