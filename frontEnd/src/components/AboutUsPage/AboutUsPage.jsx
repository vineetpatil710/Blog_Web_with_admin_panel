
import './AboutUsPage.css';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BASE_URL } from "../localhost/localhost.jsx"
import axios from 'axios';

// In a real React application, this CSS would be in a separate file (e.g., AboutUsPage.css)
// and imported. For this self-contained example, it's included in a <style> tag.



function AboutUsPage() {
  const [banners, setBanners] = useState([]);


  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // Make sure the URL matches your backend server's address and port
        const response = await axios.get(`${BASE_URL}/AboutText`);
        setBanners(response.data);
      } catch (err) {
        console.error('Error fetching banners:', err);
      }
    };

    fetchBanners();
  }, []);


  const [AboutCard, setAboutCard] = useState([]);


  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // Make sure the URL matches your backend server's address and port
        const response = await axios.get(`${BASE_URL}/AboutCard`);
        setAboutCard(response.data);
      } catch (err) {
        console.error('Error fetching banners:', err);
      }
    };

    fetchBanners();
  }, []);




  const cardData = AboutCard.map((banner) => ({


    category: banner.category,
    title: banner.title,
    imageUrl: `${BASE_URL}/${banner.imageUrl}`,
  }));


  // const cardData = [
  //   {
  //     category: 'Products',
  //     title: 'Explore our products and features across Search, Google Workspace and more',
  //     imageUrl: 'https://images.unsplash.com/photo-1554672408-730436b60dde?q=80&w=1935&auto=format&fit=crop',
  //   }
  // ];

  const ExternalLinkIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="card-link-icon"
    >
      <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4h-2v4H6V6h4V4zm10-4v6h-2V3.414l-7.293 7.293-1.414-1.414L16.586 2H14V0h6z" />
    </svg>
  );

  return (
    <div className="about-us-page">
      <div className="hero-section">
        <p className="subtitle">{banners.title}</p>
        <h1 className="title">{banners.author}</h1>
        <p className="description">
          {banners.posts}
        </p>
      </div>
      <section className="cards-section">
        {cardData.map((card, index) => (
          <div key={index} className="info-card">
            <img src={card.imageUrl} alt={card.category} className="card-image" />
            <div className="card-content">
              <p className="card-category">{card.category}</p>
              <h3 className="card-title">{card.title}</h3>
              <div className="card-footer">
                <ExternalLinkIcon />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}



export default AboutUsPage;
