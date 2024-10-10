import React, { useState, useEffect } from 'react';
import './css/Faq.css';

const Faq = () => {
  const [faqs, setFaqs] = useState([]);

  // Fetch FAQs from the server
  useEffect(() => {
    fetch('http://localhost:4000/faq') // Adjust the endpoint as needed
      .then((response) => response.json())
      .then((data) => setFaqs(data))
      .catch((error) => console.error('Error fetching FAQs:', error));
  }, []);

  return (
    <div className="faq-container">
      <h1>FAQs</h1>
      {faqs.length > 0 ? (
        faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3 className="faq-question">{faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))
      ) : (
        <p>Loading FAQs...</p>
      )}
    </div>
  );
};

export default Faq;
