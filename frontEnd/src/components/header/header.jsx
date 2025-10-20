
import './header.css';
import React, { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://blog-web-with-admin-panel.onrender.com';
function Header() {

  const [banners, setBanners] = useState([]);
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // Make sure the URL matches your backend server's address and port
        const response = await axios.get(`${API_URL}/EditLogo`);
        setBanners(response.data);
      } catch (err) {
        console.error('Error fetching banners:', err);
      }
    };

    fetchBanners();
  }, []);






   const [Baground, setBaground ] = useState([]);
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // Make sure the URL matches your backend server's address and port
        const response = await axios.get(`${API_URL}/getcolor`);
        setBaground(response.data);
      } catch (err) {
        console.error('Error fetching banners:', err);
      }
    };

    fetchBanners();
  }, []);


  



  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/About' },
    { name: 'Categories', path: '/Categories' },
    { name: 'Contact', path: '/Contact' },
  ];
  // console.log(banners)
  return (
    <nav className="main-nav" style={{ backgroundColor: Baground.color }}  >
      <div className="header-width">
        {/* <h1 >Blog name / logo</h1> */}

        <div className="company-logo">  {banners.length > 0 && (
  <img
    src={`http://localhost:5000/${banners[0].imageUrl}`}
    alt="Blog Logo"
    className="log_image"
  />
)}
</div>
      </div>

      {navLinks.map(link => (
        <Link
          key={link.name}
          to={link.path}
          className={`nav-button ${location.pathname === link.path ? 'active' : ''}`}
        >
          {link.name}
        </Link>
      ))}

    </nav>

  );
}

export default Header;
