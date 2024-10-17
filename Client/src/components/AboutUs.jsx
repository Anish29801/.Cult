import React from 'react';
import './css/AboutUs.css';
import Faq from "./Faq";
import teamImage from "./css/img/fitness2.svg"; // Import the image for the team
import techImage1 from "./css/img/fitness3.svg"; // Import the image for the technology

const AboutUs = () => {
  return (
    <section className="about-us" id='about'>
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          At <strong>.Cult</strong>, we’re passionate about helping athletes of all skill levels achieve their
          dreams. Whether you're just starting out or you're a seasoned professional, we believe that every athlete has
          the potential to improve, and we're here to support that journey. Founded over a decade ago, we have consistently
          focused on building a community where athletes can find cutting-edge training programs, expert coaching, and
          personalized advice that helps them push their boundaries.
        </p>
        <p>
          Our team consists of former professional athletes, fitness experts, and technologists who are dedicated to
          creating an environment that drives success both physically and mentally. We understand that each athlete is
          unique, so we tailor our resources to meet your specific goals. From strength and conditioning programs to
          advanced sports analytics, <strong>.Cult</strong> is the ultimate destination for anyone looking to
          enhance their athletic performance. We combine our experience with the latest technology to deliver unmatched
          results.
        </p>
        <p>
          Our mission is simple: to empower athletes by providing them with the tools, support, and community they need to
          unlock their full potential. Whether you want to improve your endurance, sharpen your skills, or recover from an
          injury, we’re here to help. At <strong>.Cult</strong>, you're not just a member – you're a part of a
          global network of athletes who are all working together to achieve greatness.
        </p>
      </div>

      <div className="about-plans">
        <h3>Join Our Cult Family</h3>
        <div className="plans-container">
          <div className="plan-card">
            <h4>Basic Plan</h4>
            <p>Perfect for athletes starting their fitness journey.</p>
            <ul>
              <li>Access to beginner-level training programs</li>
              <li>Monthly fitness progress tracking</li>
              <li>Access to community forums and discussions</li>
              <li>Basic customer support</li>
              <li>Cost: $29.99/month</li>
            </ul>
            <a href="tel:+918464825600">
              <button className="plan-btn">Place a Call</button>
            </a>
          </div>
          <div className="plan-card">
            <h4>Pro Plan</h4>
            <p>Ideal for serious athletes looking for advanced support.</p>
            <ul>
              <li>Access to advanced and custom training programs</li>
              <li>Weekly fitness progress tracking and reports</li>
              <li>1-on-1 coaching sessions</li>
              <li>Priority customer support</li>
              <li>Cost: $59.99/month</li>
            </ul>
            <a href="tel:+918464825600">
              <button className="plan-btn">Place a Call</button>
            </a>
          </div>
        </div>
      </div>
      <Faq />
    </section>
  );
}

export default AboutUs;
