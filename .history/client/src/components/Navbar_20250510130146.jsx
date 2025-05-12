import React from "react";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">Tuinue Wasichana</h1>
        <nav className="header__nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/charities">Charities</a>
          <a href="/login">Login</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
