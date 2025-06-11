import React, { useState } from 'react';
import './Feedback.css';

const Feedback = ({ darkMode }) => {
  const [submitted, setSubmitted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFadeOut(true); // Trigger fade-out
      setTimeout(() => setSubmitted(true), 500); // Wait for fade before switching
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
              <button className="btn" type="submit">Submit</button>
            </form>
          </>
        ) : (
          <div className="thank-you-message">
            Thank you, {formData.name}, for sharing your Zone with us Buddy!
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;