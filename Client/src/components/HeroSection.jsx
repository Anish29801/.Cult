import React from 'react';
import './css/HeroSection.css';
import fitnessImage from './css/img/fitness.png';

const HeroSection = () => {
  return (
    <section className="hero" id='hero'>
      <div className="hero-content">
        <h1 className="hero-title">Unleash Your Inner Champion</h1>
        <p className="hero-subtitle">Join the best sports community and take your skills to the next level.</p>
        <a href="tel:+918464825600" style={{ textDecoration: 'none' }}>
          <button className="hero-btn">
            Get Started
          </button>
        </a>
      </div>
      <div className="hero-image">
        <img src={fitnessImage} alt="Sports Action" />
      </div>
    </section>
  );
}

export default HeroSection;
