import React, { useState } from 'react'; 
import './css/Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>.Cult</h2>
      </div>
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? 'active' : '')} 
              end // Ensure this matches exactly the root route
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/shop" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/bmi"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              BMI
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/lab"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Lab
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/mind"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Mind
            </NavLink>
          </li>
        </ul>
      </div>
      <button className="call-now-btn">
        <a href="tel:+918464825600" style={{ textDecoration: 'none', color: 'inherit' }}>
          Call Now
        </a>
      </button>

      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
}

export default Navbar;
