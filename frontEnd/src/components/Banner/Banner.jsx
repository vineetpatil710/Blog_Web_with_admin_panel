import React, { useState, useEffect, useCallback } from 'react';
import './Banner.css';
import axios from 'axios';



function Banner() {
  const [banners, setBanners] = useState([]);


  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // Make sure the URL matches your backend server's address and port
        const response = await axios.get('https://blog-web-with-admin-panel.onrender.com/banners');
        setBanners(response.data);
      } catch (err) {
        console.error('Error fetching banners:', err);
      }
    };

    fetchBanners();
  }, []);



  // --- SLIDE DATA ---
  // You can easily customize your banner slides here.
  // Just add or remove objects from this array.
  // Use high-quality images for the best look.



  const slidesData = banners.map((banner) => ({

    image: `https://blog-web-with-admin-panel.onrender.com/${banner.imageUrl}`,
    tagline: banner.tagline,
    message: banner.message
  }));




  const [currentIndex, setCurrentIndex] = useState(0);

  // Memoize goToNext to prevent re-creation on every render
  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slidesData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slidesData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Auto-play functionality
  useEffect(() => {
    // Set an interval to call goToNext every 2 seconds
    const slideInterval = setInterval(goToNext, 4000);

    // Clear the interval when the component is unmounted to prevent memory leaks
    return () => clearInterval(slideInterval);
  }, [goToNext]); // Dependency array ensures effect runs only when goToNext changes

  return (
    <>
      <div className="banner-container">


        {/* Navigation Arrows */}
        <div className="arrow left-arrow" id='l-a' onClick={goToPrevious}>
          ❮
        </div>
        <div className="arrow right-arrow" id='r-a' onClick={goToNext}>
          ❯
        </div>

        {/* Slides Wrapper */}
        <div
          className="banner-wrapper"
          style={{ transform: `translateX(${-currentIndex * 100}%)` }}
        >
          {slidesData.map((slide, index) => (
            <div
              className="banner-slide"
              key={index}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-content">
                <p className="tagline">{slide.tagline}</p>
                <h1 className="welcome-message">{slide.message}</h1>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* text */}

      <div className="container">
        {/* Left Div - 70% */}
        <div className="left-section">
          <div className="about-section">



            {banners[0] && (
              <div key={banners[0]._id} className="slide">
                <h3>{banners[0].description}</h3>

              </div>
            )}

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

export default Banner;
