import './About.css';
import Footer from '../../components/Footer/Footer.jsx';
import AboutUsPage from '../../components/AboutUsPage/AboutUsPage.jsx';
import React from 'react';
/**
 * About component displays information about the application or company.
 * It ensures the footer sticks to the bottom of the page even with minimal content.
 */
function About() {
  return (
    // The .page-placeholder div will expand to fill available vertical space
    // and internally manages its children (heading, paragraph, footer)
    <div className="page-placeholder">
      
     <AboutUsPage/>
      <Footer />
    </div>
  );
}

export default About;
