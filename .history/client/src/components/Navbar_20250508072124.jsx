import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import "../../styles/Header.css"; // your custom CSS

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo and Site Name */}
        <div className="logo-section">
          <Logo className="logo" />
          <Link to="/" className="site-name">
            Tuinue WasichanaCCI
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          <Link to="/login" className="btn login-btn">
            Login
          </Link>
          <Link to="/register" className="btn register-btn">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
