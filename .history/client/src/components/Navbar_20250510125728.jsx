import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-1.5"> {/* Reduced vertical padding */}
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <img
            src="https://socialhealthauthority.go.ke/wp-content/uploads/2024/01/SHA-Logo.svg"
            alt="Social Health Authority Logo"
            className="h-10 mr-6" {/* Adjusted logo height slightly */}
          />
        </div>

        {/* Middle: Navigation Links */}
        <nav className="hidden md:flex space-x-6 lg:space-x-10"> {/* Increased spacing */}
          <a
            href="/overview"
            className="text-gray-700 hover:text-blue-600 text-sm lg:text-base font-medium"
          >
            Overview
          </a>
          <a
            href="/faqs"
            className="text-gray-700 hover:text-blue-600 text-sm lg:text-base font-medium"
          >
            FAQs
          </a>
          <a
            href="/resources"
            className="text-gray-700 hover:text-blue-600 text-sm lg:text-base font-medium"
          >
            Resources
          </a>
        </nav>

        {/* Right Side: Buttons */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button className="bg-gray-100 hover:bg-gray-200 text-blue-600 text-sm lg:text-base font-semibold py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center">
              Related sites
              <svg
                className="fill-current h-4 w-4 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
            {/* Optional: Dropdown for related sites */}
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm lg:text-base font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300">
            Register
          </button>
          <button
            onClick={() => console.log("Navigate to Login")}
            className="bg-white border border-blue-600 text-blue-600 text-sm lg:text-base font-semibold py-2 px-4 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Login
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-gray-100 py-2 px-4">
        <a
          href="/overview"
          className="block py-2 text-gray-700 hover:text-blue-600 text-sm"
        >
          Overview
        </a>
        <a href="/faqs" className="block py-2 text-gray-700 hover:text-blue-600 text-sm">
          FAQs
        </a>
        <a
          href="/resources"
          className="block py-2 text-gray-700 hover:text-blue-600 text-sm"
        >
          Resources
        </a>
        <button className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm">
          Register
        </button>
        <button
          onClick={() => console.log("Navigate to Login (Mobile)")}
          className="block w-full bg-white border border-blue-600 text-blue-600 font-semibold py-2 rounded mt-2 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
        >
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;