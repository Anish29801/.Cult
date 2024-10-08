import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Admin.css';  

const Admin = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/contact');
        setSubmissions(response.data);
      } catch (err) {
        console.error("Error fetching contact submissions:", err);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="admin-container">
      <h2 className="admin-heading">Contact Submissions</h2>
      <div className="submissions-container">
        {submissions.map((submission) => (
          <div key={submission._id} className="submission-card">
            <h3>{submission.name}</h3>
            <p><strong>Email:</strong> {submission.email}</p>
            <p><strong>Message:</strong> {submission.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
