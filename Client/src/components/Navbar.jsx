import React from 'react';
import './css/Navbar.css';
import { Link } from 'react-scroll';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>.Cult</h2>
      </div>
      <ul className="nav-links">
        <li>
          <Link 
            to="home" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="about-us"
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500}
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            to="contact" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500}
          >
            Contact Us
          </Link>
        </li>
      </ul>
      <button className="call-now-btn">
        <a href="tel:+918464825600" style={{ textDecoration: 'none', color: 'inherit' }}>
          Call Now
        </a>
      </button>
    </nav>
  );
}

export default Navbar;
