import React, { useState } from 'react';
import './css/BMI.css'; 
import fitnessImage from "./css/img/fitness1.svg"; // Import the image
import SaleTimerBanner from './SaleTimerBanner';

const BMI = () => {
  const [gender, setGender] = useState(''); // State for gender
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [error, setError] = useState(''); // State for error message

  const calculateBMI = () => {
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);
  
    // Check for valid positive numbers for weight and height
    if (isNaN(weightValue) || isNaN(heightValue) || weightValue <= 0 || heightValue <= 0) {
      setError('Please enter valid positive numbers for weight and height.');
      setBMI(null);
      return;
    }

    // Height should be in meters for the formula, so check if input might be in centimeters
    const heightInMeters = heightValue > 3 ? heightValue / 100 : heightValue;

    // Calculate BMI
    const calculatedBMI = (weightValue / (heightInMeters * heightInMeters)).toFixed(2);
    setBMI(parseFloat(calculatedBMI)); // Convert to a number to ensure proper numeric display
    setError(''); // Clear error if successful
  };

  const getBMICategory = () => {
    if (bmi === null) return ''; // Prevent rendering if BMI is not calculated

    if (bmi < 16) {
      return "Severely Underweight";
    } else if (bmi >= 16 && bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      if (gender === 'female' && bmi > 24) {
        return "High Normal weight";
      }
      return "Normal weight";
    } else if (bmi >= 25 && bmi <= 29.9) {
      if (gender === 'male' && bmi > 27) {
        return "High Overweight";
      }
      return "Overweight";
    } else {
      return "Obese";
    }
  };

  return (
    <div className='con'>
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

          {/* Weight Input */}
          <div className="input-group">          
            <label htmlFor="weight" className='header'>Weight (kg):</label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kg"
              min="1" // Ensures positive values
            />
          </div>

          {/* Height Input */}
          <div className="input-group">
            <label htmlFor="height" className='header'>Height (m):</label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height in meters"
              step="0.01"
              min="0.1" // Ensures positive values
            />
          </div>

          {/* Calculate Button */}
          <button onClick={calculateBMI} className="calculate-btn">Calculate BMI</button>

          {/* Display error message if inputs are invalid */}
          {error && <p className="error-message">{error}</p>}

          {/* Display BMI result */}
          {bmi && (
            <div className="bmi-result">
              <h3 className='header'>Your BMI: {bmi}</h3>
              <p>{getBMICategory()}</p>

              {/* Show 'Call a Doctor' button if BMI is extremely low */}
              {bmi < 16 && (
                <button className="call-doctor-btn">Call a Doctor</button>
              )}

              {/* Show 'Start a Training Session' button for normal and above normal BMI */}
              {bmi >= 18.5 && (
                <button className="start-training-btn" style={{ backgroundColor: 'blue', color: 'white' }}>Start a Training Session</button>
              )}

              {/* Book a session button for others */}
              {bmi >= 16 && bmi < 18.5 && (
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
        <br/>
        <SaleTimerBanner />
        <br/>
        <h3 className='header'>Why is BMI Important?</h3>
        <p>
          BMI helps you understand whether your body weight is appropriate for your height. While it’s 
          not a diagnostic tool, it provides an indication of potential health risks such as heart disease, 
          diabetes, and other weight-related conditions. Maintaining a normal BMI can contribute to overall 
          well-being and longevity.
        </p>
      </div>
    </div>
  );
};

export default BMI;
