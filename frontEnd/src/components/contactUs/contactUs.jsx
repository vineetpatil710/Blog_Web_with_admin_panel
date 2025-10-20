import React from 'react';
import './contactUs.css';
import { useState } from 'react';
import axios from 'axios';


function ContactUs() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://blog-web-with-admin-panel.onrender.com/api/contact', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message.');
    }
  };


  return (
    <div className="contact-us-container">
      <div className="contact-us-bg"></div>
      <div className="contact-us-content">
        <div className="contact-left">
          <div className="contact-header">
            <h1>Get In Touch</h1>
            <p>We are here for you! How can we help?</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
        <div className="contact-right">
          <div className="contact-info">
            <div className="info-item">
              <span className="icon">📍</span>
              <p>123 Future Street, Neo City, 12345</p>
            </div>
            <div className="info-item">
              <span className="icon">✉️</span>
              <p>contact@futurecorp.io</p>
            </div>
            <div className="info-item">
              <span className="icon">📞</span>
              <p>+1 234 567 8900</p>
            </div>
          </div>
          <div className="social-links">
            <a href="https://www.facebook.com/" className="social-icon">f</a>
            <a href="https://telegram.org/" className="social-icon">t</a>
            <a href="https://www.linkedin.com/in/vineet--patil/" className="social-icon">in</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
