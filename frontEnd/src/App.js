
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { BASE_URL } from "../src/components/localhost/localhost.jsx";   
import Header from './components/header/header.jsx';// Header includes nav only
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// Import pages

import Home from './page/Home/Home.jsx';
import About from './page/About/About.jsx';
import Categories from './page/Categories/Categories.jsx';

import Contact from './page/Contact/Contact.jsx';
import AdminPanel from './page/AdminPanel/AdminPanel.jsx';
import './App.css';
function App() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // Make sure the URL matches your backend server's address and port
        const response = await axios.get(`${BASE_URL}/BackgroundColor`);
        setBanners(response.data);
      } catch (err) {
        console.error('Error fetching banners:', err);
      }
    };

    fetchBanners();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: banners.color }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/AdminPanel" element={<AdminPanel />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
