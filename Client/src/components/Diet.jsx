import React from 'react';
import './css/Diet.css';
import swiggyLogo from './css/img/Swiggy.svg';  // Regular image import
import ONDCLogo from './css/img/ONDC.webp';  // Regular image import
import zomatoLogo from './css/img/Zomato.svg';  // Regular image import
import healthyFood from './css/img/h1.jpg'; // Blog post image import
import balancedDiet from './css/img/h2.jpg'; // Blog post image import
import healthyEatingMyths from './css/img/h3.jpg'; // Blog post image import
import healthyEatingDish from './css/img/h4.jpg'; // Updated image import for the 4th image
import Footer from "./Footer"

const Diet = () => {
  return (
    <div className='diet-container'>
      <h1>Welcome to the Cult Diet</h1>
      <div className="blog-grid">
        {/* Blog posts */}
        <div className="blog-post">
          <h2>5 Best Foods for a Healthy Diet</h2>
          <img src={healthyFood} alt="Healthy Food" />
          <p>
            Discover the top 5 foods that can boost your health and help you maintain a balanced diet.
            From leafy greens like spinach and kale, which are rich in vitamins A, C, and K, to nutrient-dense nuts like almonds and walnuts,
            these foods provide the essential nutrients your body needs. Include these superfoods in your daily diet to improve your overall well-being,
            enhance energy levels, and promote better digestion.
          </p>
          <p>
            Embrace a variety of fruits like berries, which are loaded with antioxidants, and opt for whole grains such as quinoa and brown rice for sustained energy.
            Remember, consistency is key when aiming for a healthier lifestyle.
          </p>
        </div>
        <div className="blog-post">
          <h2>How to Plan a Balanced Diet</h2>
          <img src={balancedDiet} alt="Balanced Diet" />
          <p>
            Planning a balanced diet is essential for long-term health. A well-rounded diet includes a variety of macronutrients—proteins, carbohydrates, and healthy fats—alongside a good mix of vitamins and minerals.
            Learn how to create meal plans that incorporate all the essential nutrients and maintain a balanced intake.
          </p>
          <p>
            Focus on including fresh fruits, vegetables, lean proteins like chicken and fish, and whole grains. Pair your meals with healthy fats like olive oil, avocado, and nuts.
            Make sure to stay hydrated with plenty of water throughout the day. A balanced diet not only keeps you fit but also boosts your immune system and keeps chronic diseases at bay.
          </p>
        </div>
        <div className="blog-post">
          <h2>10 Myths About Healthy Eating</h2>
          <img src={healthyEatingMyths} alt="Healthy Eating Myths" />
          <p>
            There are many misconceptions about what constitutes healthy eating. Let's debunk the top 10 myths and get the facts straight.
            From the idea that all fats are bad for you, to the misconception that eating after 6 PM leads to weight gain, we clarify the truths behind these popular beliefs.
          </p>
          <p>
            Did you know that not all carbs are created equal? While refined carbs can spike blood sugar, complex carbs like those found in oats and sweet potatoes provide lasting energy.
            Another common myth is that skipping meals helps with weight loss; in reality, it can slow your metabolism and lead to overeating later.
          </p>
          <p>
            Get informed and make the right choices for a healthier, more balanced lifestyle.
          </p>
        </div>
        <div className="blog-post">
          <h2>Our Delivery Partners</h2>
          <div className="platforms">
            <div className="platform">
              <a href='https://www.swiggy.com/'>
                <img src={swiggyLogo} alt="Swiggy Logo" className="logo" />
              </a>
            </div>
            <div className="platform">
              <a href='https://www.zomato.com/'>
                <img src={zomatoLogo} alt="Zomato Logo" className="logo large-logo" />
              </a>
            </div>
            <div className="platform">
              <a href='https://ondc.org/'>
                <img src={ONDCLogo} alt="ONDC Logo" className="logo large-logo" />
              </a>
            </div>
          </div>
        </div>
        <div className="blog-post">
          <h2>Healthy Eating Dishes to Try</h2>
          <img src={healthyEatingDish} alt="Healthy Eating Dish" />
          <p>
            Discover delicious and healthy dishes that you can easily prepare at home. From vibrant salads with fresh vegetables and lean proteins to hearty grain bowls,
            these recipes are designed to keep you feeling full and satisfied. Enjoy the flavors of a balanced meal without compromising on taste.
          </p>
          <p>
            Experiment with different herbs and spices to add depth to your meals, and try out new cooking methods like steaming or roasting to retain nutrients.
            Eating healthy doesn't have to be boring when you have a variety of flavorful dishes to explore.
          </p>
        </div>
      </div>

      {/* Book a One-to-One Session Section */}
      <div className="book-session blog-post">
        <h2>Book a One-to-One Session with Our Dietitian</h2>
        <p>
          Get personalized advice and guidance tailored to your dietary needs. Our expert dietitian will help you create a plan that aligns with your health goals and lifestyle.
          Schedule your session today to start your journey towards a healthier you.
        </p>
        <button className="book-button" onClick={() => window.location.href = '/book-session'}>
          Book Now
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Diet;
