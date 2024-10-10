import React from 'react';
import './css/CultComponent.css'; // Import the CSS file

const CultComponent = () => {
  return (
    <div className="cult-container">
      {/* Background gradient lines */}
      <div className="background-gradient"></div>

      {/* Text Content */}
      <div className="text-content">
        <h1 className="main-heading">
          WE ARE <span className="highlight">.cult</span>
        </h1>
        <p className="description">
          At <span className="highlight">.cult</span>, we make group workouts fun, daily food
          healthy & tasty, mental fitness easy with yoga & meditation, and medical & lifestyle care
          hassle-free.
          <br />
          <span className="hashtag">#BeBetterEveryDay</span>
        </p>
      </div>
    </div>
  );
};

export default CultComponent;
