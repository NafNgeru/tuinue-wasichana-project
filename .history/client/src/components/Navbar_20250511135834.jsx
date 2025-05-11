import React from "react";
import Logo from "../../src/assets/logo.svg";
// import "../styles/Header.css"; // Remove this line

const Navbar = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Tuinue Wasichana Logo"
            className="h-6 w-6 mr-2" // Reduced height and width
          />{" "}
          {/* Use <img> tag */}
          <h1 className="text-xl font-bold text-gray-800">Tuinue Wasichana</h1>
        </div>
        <nav className="space-x-4">
          <a
            href="/"
            className="text-gray-600 hover:text-blue-500 transition duration-300"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-gray-600 hover:text-blue-500 transition duration-300"
          >
            About
          </a>
          <a
            href="/charities"
            className="text-gray-600 hover:text-blue-500 transition duration-300"
          >
            Charities
          </a>
          <a
            href="/login"
            className="text-gray-600 hover:text-blue-500 transition duration-300"
          >
            Login
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
