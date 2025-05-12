import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // install lucide-react if not already

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-blue-100 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex-shrink-0 text-2xl md:text-3xl font-extrabold text-blue-800 tracking-wide">
            Tuinue <span className="text-pink-500">Wasichana</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center text-blue-900 font-medium">
            <Link
              to="/"
              className="hover:text-pink-500 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-pink-500 transition duration-300"
            >
              About
            </Link>
            <Link
              to="/charities"
              className="hover:text-pink-500 transition duration-300"
            >
              Charities
            </Link>
            <Link
              to="/login"
              className="hover:text-pink-500 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/donate"
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full shadow-md transition duration-300"
            >
              Donate Now
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="text-blue-900">
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-blue-100 px-6 pb-6 space-y-4 text-blue-900 font-medium animate-fade-in-down">
          <Link to="/" onClick={() => setOpen(false)} className="block">
            Home
          </Link>
          <Link to="/about" onClick={() => setOpen(false)} className="block">
            About
          </Link>
          <Link
            to="/charities"
            onClick={() => setOpen(false)}
            className="block"
          >
            Charities
          </Link>
          <Link to="/login" onClick={() => setOpen(false)} className="block">
            Login
          </Link>
          <Link
            to="/donate"
            onClick={() => setOpen(false)}
            className="block bg-pink-500 hover:bg-pink-600 text-white text-center py-2 rounded-full"
          >
            Donate Now
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
