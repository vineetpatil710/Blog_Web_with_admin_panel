
import React, { useState, useEffect, useRef } from 'react';
import './trendingBlogs.css'; // Import the CSS file
import axios from 'axios';
import { BASE_URL } from "../localhost/localhost.jsx";   
function TrendingBlogs() {

  const [banners, setBanners] = useState([]);


  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // Make sure the URL matches your backend server's address and port
        const response = await axios.get(`${BASE_URL}/trendingblogs`);
        setBanners(response.data);
      } catch (err) {
        console.error('Error fetching banners:', err);
      }
    };

    fetchBanners();
  }, []);



  const carouselRef = useRef(null);



  const blogPosts = banners.map((banner) => ({

    title: banner.BlogTitle,
    rating: banner.AgeRatings,
    date: '1 hour ago',
    image: `${BASE_URL}${banner.imageUrl}`,

  }));



  // Function to scroll the carousel
  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="trending-container">
        <div className="header">
          <div className="tagBody">
            <div className="taglinee">Top 10 Blogs This Week</div>
          </div>
          <h1>TRENDING BLOGS</h1>
        </div>

        <div className="carousel-wrapper">
          {/* Left Arrow Button */}
          <button className="arrow-button left" onClick={() => scroll('left')}>
            &#8249;
          </button>

          <div className="carousel" ref={carouselRef}>
            {blogPosts.map((item, index) => (
              <div className="blog-card" key={index}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="blog-image"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found'; }}
                />
                <div className="overlay">
                  <div className="icons">
                    <button className="icon-btn play-btn">
                      ▶
                    </button>
                    <button className="icon-btn">
                      ＋
                    </button>
                    <button className="icon-btn">
                      ×
                    </button>
                    <button className="icon-btn">
                      ❤️
                    </button>
                    <button className="icon-btn more-info">
                      <div id="chevron-down" ></div>
                    </button>
                  </div>
                  <div className="blog-content">
                    <h2 className="blog-title">{item.title}</h2>
                    <div className="title-date">
                      <span className="rating">{item.rating}</span>
                      <span className="date">{item.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button className="arrow-button right" onClick={() => scroll('right')}>
            &#8250;
          </button>
        </div>


      </div>


      <div className="container">
        {/* Left Div - 70% */}
        <div className="left-section">
          <div className="about-section">
            <h3>About company and website</h3>
            {/* Add more content about your company here */}
          </div>
        </div>

        {/* Right Div - 30% */}
        <div className="vLogo">
          <div className="huncwot-logo-container">
            <svg width="100%" height="100%" viewBox="0 0 110 100" overflow="visible">
              <defs>
                <pattern
                  id="huncwot-lines-pattern"
                  patternUnits="userSpaceOnUse"
                  width="100"
                  height="0.8"
                >
                  <rect width="100" height="0.4" fill="#31292a" />
                </pattern>
              </defs>

              <path
                className="huncwot-path"
                d="M 50 50 L 100 150 L 150 50"
                fill="none"
                stroke="url(#huncwot-lines-pattern)"
                strokeWidth="30"
                strokeLinecap="butt"
              />
            </svg>
          </div>
        </div>
      </div>


    </>

  );
}

export default TrendingBlogs;
