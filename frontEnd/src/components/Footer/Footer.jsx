
import './Footer.css'; // Import the CSS file
import { BASE_URL } from "../localhost/localhost.jsx";   
import React, { useState, useEffect, useCallback, useRef } from 'react';

import axios from 'axios';

const api = `${BASE_URL}`;
const Footer = () => {
  const [Footer, setFooter] = useState([]);


  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // Make sure the URL matches your backend server's address and port
        const response = await axios.get(`${api}/Footer`);
        setFooter(response.data);
      } catch (err) {
        console.error('Error fetching banners:', err);
      }
    };

    fetchBanners();
  }, []);





  return (
    <footer className="footer" style={{ backgroundColor: Footer.color }}>
      <div className="footer-container">

        {/* Top Section: Text */}
        <div className="footer-left">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>

        {/* Bottom Section: Social Links */}
        <div className="footer-links">
          <a href={Footer.text1} target="_blank" rel="noopener noreferrer">
            <button>Twitter</button>
          </a>
          <a href={Footer.text2} target="_blank" rel="noopener noreferrer">
            <button>LinkedIn</button>
          </a>

          <a href={Footer.text3} target="_blank" rel="noopener noreferrer" >
            <button>Email</button>
          </a>
        </div>

      </div>
    </footer>

  );
};

export default Footer;
