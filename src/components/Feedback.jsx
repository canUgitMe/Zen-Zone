import React, { useState } from 'react';
import './Feedback.css';

const Feedback = ({ darkMode }) => {
  const [submitted, setSubmitted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.name && formData.email && formData.message) {
    try {
      const res = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        console.log('✅ Submitted:', data);
        setFadeOut(true);
        setTimeout(() => setSubmitted(true), 500);
      } else {
        alert('❌ Submission failed. Try again!');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Server error. Check console.');
    }
  }
};


  return (
    <div className={`feedback-page ${darkMode ? 'dark' : 'light'}`}>
      <div className={`glass-form ${submitted ? 'fade-in' : fadeOut ? 'fade-out' : ''}`}>
        {!submitted ? (
          <>
            <h2 className="feedback-title">🌿 Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div className='input-group'>
              <input
                className="Feed"
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                className="Feed"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                className="Feed"
                name="message"
                placeholder="Your peaceful thoughts are precious to us"
                value={formData.message}
                onChange={handleChange}
                required
              />
              </div>
              <button className={`btn ${darkMode ? 'light' : 'dark'}`} type="submit">Submit</button>
            </form>
          </>
        ) : (
          <div className="thank-you-message">
            Thank you, {formData.name}, for sharing your Zone with us!
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;