import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-2">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <img
            src="https://socialhealthauthority.go.ke/wp-content/uploads/2024/01/SHA-Logo.svg"
            alt="Social Health Authority Logo"
            className="h-12 mr-6"
          />
        </div>

        {/* Middle: Navigation Links (Hidden on small screens) */}
        <nav className="hidden md:flex space-x-4 lg:space-x-8">
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
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm lg:text-base font-semibold py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center">
              Related sites
              <svg
                className="fill-current h-4 w-4 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
            {/* Optional: Dropdown for related sites (You'll need to implement the toggle logic) */}
            {/* <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-10">
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm">Site 1</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm">Site 2</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm">Site 3</a>
            </div> */}
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm lg:text-base font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300">
            Register
          </button>
          <button
            onClick={() => console.log("Navigate to Login")} // Replace with your actual navigation logic
            className="bg-transparent border border-blue-600 text-blue-600 text-sm lg:text-base font-semibold py-2 px-4 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Login
          </button>
        </div>
      </div>

      {/* Mobile Navigation (Hidden by default, can be toggled with JavaScript) */}
      <div className="md:hidden bg-gray-100 py-2 px-4">
        <a
          href="/overview"
          className="block py-2 text-gray-700 hover:text-blue-600 text-sm"
        >
          Overview
        </a>
        <a
          href="/faqs"
          className="block py-2 text-gray-700 hover:text-blue-600 text-sm"
        >
          FAQs
        </a>
        <a
          href="/resources"
          className="block py-2 text-gray-700 hover:text-blue-600 text-sm"
        >
          Resources
        </a>
        {/* Add mobile register/login buttons here if needed */}
        <button className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm">
          Register
        </button>
        <button
          onClick={() => console.log("Navigate to Login (Mobile)")} // Replace with your actual navigation logic
          className="block w-full bg-transparent border border-blue-600 text-blue-600 font-semibold py-2 rounded mt-2 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
        >
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
