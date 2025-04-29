import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p>&copy; {new Date().getFullYear()} Tuinue Wasichana. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
