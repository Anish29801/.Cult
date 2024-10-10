import React, { useState } from 'react';
import './css/BMI.css'; 
import fitnessImage from "./css/img/fitness1.svg"; // Import the image

const BMI = () => {
  const [gender, setGender] = useState(''); // State for gender
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState(null);

  const calculateBMI = () => {
    const calculatedBMI = (weight / (height * height)).toFixed(2);
    setBMI(calculatedBMI);
  };

  const getBMICategory = () => {
    if (bmi < 16) {
      return "Severely Underweight";
    } else if (bmi >= 16 && bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      if (gender === 'female' && bmi > 24) {
        return "High Normal weight"; // Small adjustment for females
      }
      return "Normal weight";
    } else if (bmi >= 25 && bmi <= 29.9) {
      if (gender === 'male' && bmi > 27) {
        return "High Overweight"; // Small adjustment for males
      }
      return "Overweight";
    } else {
      return "Obese";
    }
  };

  return (
    <>
      <div className="bmi-container">
        {/* Image on the left */}
        <div className="bmi-image">
          <img src={fitnessImage} alt="Fitness" />
        </div>

        {/* BMI form on the right */}
        <div className="bmi-form">
          <h2 className='header'>BMI Calculator</h2>
          
          {/* Gender Dropdown */}
          <div className="input-group">
            <label htmlFor="gender" className='header'>Gender:</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="input-group">          
            <label htmlFor="weight" className='header'>Weight (kg):</label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kg"
            />
          </div>
          <div className="input-group">
            <label htmlFor="height" className='header'>Height (m):</label> {/* Changed to meters */}
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height in meters" /* Changed placeholder */
              step="0.01" /* Allows more precision for meters */
            />
          </div>
          <button onClick={calculateBMI} className="calculate-btn">Calculate BMI</button>

          {bmi && (
            <div className="bmi-result">
              <h3 className='header'>Your BMI: {bmi}</h3>
              <p>{getBMICategory()}</p>

              {/* Show 'Call a Doctor' button if BMI is extremely low */}
              {bmi < 16 && (
                <button className="call-doctor-btn">Call a Doctor</button>
              )}

              {/* Book a session button for others */}
              {bmi >= 16 && (
                <button className="book-session-btn">Book a Session</button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Explanation Card */}
      <div className="bmi-info-card">
        <h3 className="header">What is BMI?</h3>
        <p>
          Body Mass Index (BMI) is a simple calculation that uses your height and weight to assess whether 
          you're within a healthy weight range. It’s an important tool for identifying potential health 
          risks related to being underweight, overweight, or obese.
        </p>
        <h3 className='header'>Why is BMI Important?</h3>
        <p>
          BMI helps you understand whether your body weight is appropriate for your height. While it’s 
          not a diagnostic tool, it provides an indication of potential health risks such as heart disease, 
          diabetes, and other weight-related conditions. Maintaining a normal BMI can contribute to overall 
          well-being and longevity.
        </p>
      </div>
    </>
  );
};

export default BMI;
