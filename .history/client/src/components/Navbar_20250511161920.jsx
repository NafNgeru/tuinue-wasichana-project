import React from "react";
import Logo from "../../src/assets/logo.svg";
import HerFutureLogo from "../../client/src/assets/herfuture.png"; // Corrected import path

const Navbar = () => {
  return (
    <header className="bg-white shadow-md py-4" style={{ height: "120px" }}>
      <div
        className="mx-auto flex items-center justify-between px-4" // Removed 'container' class
        style={{ height: "100%", marginLeft: "0" }} // Container moved to the left
      >
        <div className="flex flex-col items-start">
          {" "}
          {/* Changed to flex-col and items-start */}
          <div className="flex items-center mb-1">
            {" "}
            {/* Added margin-bottom for spacing */}
            <img
              src={HerFutureLogo}
              alt="Her Future Logo"
              className="mr-2"
              style={{ height: "80px", marginRight: "1rem" }}
            />
            <img
              src={Logo}
              alt="Tuinue Wasichana Logo"
              style={{ height: "80px", marginRight: "1rem" }}
            />
            <h1
              className="text-xl font-bold text-gray-800"
              style={{ fontSize: "2rem" }}
            >
              Tuinue Wasichana
            </h1>
          </div>
          <h3 className="text-lg text-gray-600">Empowering Her Future</h3>
        </div>
        <nav
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            marginRight: "2rem", // Add a right margin to the navigation container
          }}
        >
          <a
            href="/"
            className="text-gray-600 hover:text-blue-500 transition duration-300"
            style={{ marginRight: "1rem", fontSize: "1.2rem" }}
          >
            Home
          </a>
          <a
            href="/about"
            className="text-gray-600 hover:text-blue-500 transition duration-300"
            style={{ marginRight: "1rem", fontSize: "1.2rem" }}
          >
            About
          </a>
          <a
            href="/charities"
            className="text-gray-600 hover:text-blue-500 transition duration-300"
            style={{ marginRight: "1rem", fontSize: "1.2rem" }}
          >
            Charities
          </a>
          <a
            href="/login"
            className="text-gray-600 hover:text-blue-500 transition duration-300"
            style={{ fontSize: "1.2rem" }}
          >
            Login
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
