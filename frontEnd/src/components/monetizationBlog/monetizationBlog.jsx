// MonetizationBlog.js
import React, { useState, useEffect, useCallback ,useRef} from 'react';
import './monetizationBlog.css'
import axios from 'axios';

// CSS is included here to create a self-contained component.


function MonetizationBlog() {
  const [banners, setBanners] = useState([]);


  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // Make sure the URL matches your backend server's address and port
        const response = await axios.get('https://blog-web-with-admin-panel.onrender.com/EditMonetizationget');
        setBanners(response.data);
      } catch (err) {
        console.error('Error fetching banners:', err);
      } 
    };

    fetchBanners();
  }, []);

  

  return (
    <>
  
      <div className="monetization-container">
        <header className="monetization-header">
          <h1>monetization blog</h1>
        </header>
        <main className="monetization-content">
          <h2>  {banners && banners.EditMonetizationBlog}</h2>
          <div className="button-container">
            <button className="learn-more-btn">Learn More</button>
          </div>
        </main>
      </div>
    </>
  );
}

export default MonetizationBlog;
