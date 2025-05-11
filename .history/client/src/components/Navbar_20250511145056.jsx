import React from "react";
import Logo from "../../src/assets/logo.svg";
import HerFutureLogo from "../../client/src/assets/herfuture.png"; // Corrected import path

const Navbar = () => {
  return (
    <header className="bg-white shadow-md py-4" style={{ height: "120px" }}>
      <div
        className="container mx-auto flex items-center justify-between px-4"
        style={{ height: "100%" }}
      >
        <div
          className="flex items-center"
          style={{ marginLeft: "-16px" }} // Adjust this value to move further left
        >
          <img
            src={HerFutureLogo}
            alt="Her Future Logo"
            className="mr-2"
            style={{ height: "80px" }}
          />
          <img
            src={Logo}
            alt="Tuinue Wasichana Logo"
            className="mr-2"
            style={{ height: "80px" }}
          />
          <h1 className="text-xl font-bold text-gray-800">Tuinue Wasichana</h1>
        </div>
        <nav
          className="space-x-4"
          style={{ height: "100%", display: "flex", alignItems: "center" }}
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
