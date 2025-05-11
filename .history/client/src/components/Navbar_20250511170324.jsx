import React from "react";
import Logo from "../../src/assets/logo.svg";
import HerFutureLogo from "../../client/src/assets/herfuture.png"; // Corrected import path

const Navbar = () => {
  return (
    <header
      className="shadow-md py-4" // Removed bg-white
      style={{ height: "140px", backgroundColor: "#f0f0f0" }} // Added light grey background
    >
      <div
        className="mx-auto flex items-center justify-between px-4" // Removed 'container' class
        style={{ height: "100%", marginLeft: "0" }} // Container moved to the left
      >
        <div className="flex items-center">
          <img
            src={HerFutureLogo}
            alt="Her Future Logo"
            className="mr-2"
            style={{ height: "100px", width: "100px", marginRight: "1rem" }} // Increased height and width
          />
          <img
            src={Logo}
            alt="Tuinue Wasichana Logo"
            style={{ height: "100px", width: "100px", marginRight: "1rem" }} // Increased height and width
          />
          <div className="flex flex-col items-center -mt-4">
            <h1
              className="text-xl font-bold" // Removed text-gray-800
              style={{
                fontSize: "2rem",
                marginBottom: "0rem",
                color: "blue",
                fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
              }}
            >
              Tuinue Wasichana
            </h1>
            <h3
              className="text-lg" // Removed text-gray-600
              style={{
                color: "blue",
                fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
              }}
            >
              Empowering Her Future
            </h3>
          </div>
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
            className="hover:text-blue-500 transition duration-300" // Removed text-gray-600
            style={{
              marginRight: "1rem",
              fontSize: "1.2rem",
              color: "black",
              fontFamily: 'Roboto, "Helvetica Neue", sans-serif', // Applied Option 1
            }}
          >
            Home
          </a>
          <a
            href="/about"
            className="hover:text-blue-500 transition duration-300" // Removed text-gray-600
            style={{
              marginRight: "1rem",
              fontSize: "1.2rem",
              color: "black",
              fontFamily: 'Roboto, "Helvetica Neue", sans-serif', // Applied Option 1
            }}
          >
            About
          </a>
          <a
            href="/stories"
            className="hover:text-blue-500 transition duration-300" // Removed text-gray-600
            style={{
              fontSize: "1.2rem",
              color: "black",
              marginRight: "1rem",
              fontFamily: 'Roboto, "Helvetica Neue", sans-serif', // Applied Option 1
            }}
          >
            Stories
          </a>
          <a
            href="/charities" // Changed order to match user's request
            className="hover:text-blue-500 transition duration-300" // Removed text-gray-600
            style={{
              fontSize: "1.2rem",
              color: "black",
              fontFamily: 'Roboto, "Helvetica Neue", sans-serif', // Applied Option 1
            }}
          >
            Charities
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
