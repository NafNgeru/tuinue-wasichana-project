import React from 'react';
//import './Footer.scss';

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
