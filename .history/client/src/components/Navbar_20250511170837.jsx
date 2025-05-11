import React from "react";
import Logo from "../../src/assets/logo.svg";
import HerFutureLogo from "../../src/assets/herfuture.png"; // Corrected import path

const Navbar = () => {
  return (
    <header
      className="shadow-md py-4"
      style={{ height: "140px", backgroundColor: "#f0f0f0" }}
    >
      <div
        className="mx-auto flex items-center justify-between px-4"
        style={{ height: "100%", marginLeft: "4" }}
      >
        <div className="flex items-center">
          <img
            src={HerFutureLogo}
            alt="Her Future Logo"
            className="mr-2"
            style={{ height: "100px", width: "100px", marginRight: "2rem" }}
          />
          <img
            src={Logo}
            alt="Tuinue Wasichana Logo"
            style={{ height: "100px", width: "100px", marginRight: "2rem" }}
          />
          <div className="flex flex-col items-center -mt-4">
            <h1
              className="text-xl font-bold"
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
              className="text-lg"
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
            marginRight: "2rem",
          }}
        >
          <a
            href="/"
            className="hover:text-blue-500 transition duration-300"
            style={{
              marginRight: "1.5rem",
              fontSize: "1.2rem",
              color: "black",
              fontFamily: 'Roboto, "Helvetica Neue", sans-serif', // Applied Roboto font
            }}
          >
            Home
          </a>
          <a
            href="/about"
            className="hover:text-blue-500 transition duration-300"
            style={{
              marginRight: "1.5rem",
              fontSize: "1.2rem",
              color: "black",
              fontFamily: 'Roboto, "Helvetica Neue", sans-serif', // Applied Roboto font
            }}
          >
            About
          </a>
          <a
            href="/stories"
            className="hover:text-blue-500 transition duration-300"
            style={{
              fontSize: "1.2rem",
              color: "black",
              marginRight: "1.5rem",
              fontFamily: 'Roboto, "Helvetica Neue", sans-serif', // Applied Roboto font
            }}
          >
            Stories
          </a>
          <a
            href="/charities"
            className="hover:text-blue-500 transition duration-300"
            style={{
              fontSize: "1.2rem",
              color: "black",
              fontFamily: 'Roboto, "Helvetica Neue", sans-serif', // Applied Roboto font
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
