import React from 'react';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} .Cult. All rights reserved.</p>
        <p>
          Designed with ❤️ by <a href="https://github.com/anish29801" target="_blank" rel="noopener noreferrer">Anish Agrawal</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
