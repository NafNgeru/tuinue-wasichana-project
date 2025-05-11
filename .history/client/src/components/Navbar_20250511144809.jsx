import React from "react";
import Logo from "../../src/assets/logo.svg";
import HerFutureLogo from "../../src/assets/herfuture.png"; // Corrected import path

const Navbar = () => {
  return (
    <header
      className="bg-white shadow-md py-4" // Keep other Tailwind classes
      style={{ height: "120px" }} // Example: Set a fixed height of 120 pixels
    >
      <div
        className="container mx-auto flex items-center px-4" // Removed justify-between
        style={{ height: "100%" }} // Ensure inner div can fill the header
      >
        <div className="flex items-center" style={{ height: "100%" }}>
          {/* Ensure logo and text are vertically centered */}
          <img
            src={HerFutureLogo}
            alt="Her Future Logo"
            className="mr-2"
            style={{ height: "80px" }} // Adjust image heights if needed
          />
          <img
            src={Logo}
            alt="Tuinue Wasichana Logo"
            className="mr-2"
            style={{ height: "80px" }} // Adjust image heights if needed
          />
          <h1 className="text-xl font-bold text-gray-800">Tuinue Wasichana</h1>
        </div>
        <nav
          className="space-x-4"
          style={{ height: "100%", display: "flex", alignItems: "center" }}
          // Vertically center navigation
        >
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
