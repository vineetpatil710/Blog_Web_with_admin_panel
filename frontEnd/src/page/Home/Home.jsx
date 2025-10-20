import React, { useState } from 'react';

import './Home.css'
// import Header from '../../components/header/header.jsx';
// import SideBar from '../../components/sideBar/sideBar.jsx';
// import MenuIcon from '../../components/MenuIcon/MenuIcon.jsx';
import Banner from '../../components/Banner/Banner.jsx';



import TrendingBlogs from '../../components/trendingBlogs/trendingBlogs.jsx';

import BlogCategory from '../../components/blogCategory/blogCategory.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import MonetizationBlog from '../../components/monetizationBlog/monetizationBlog.jsx';


function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <div className='HeaderBody'>
        {/* <Header /> */}
        {/* <MenuIcon onClick={toggleSidebar} /> */}
        {/* <SideBar isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
        <Banner />
        <TrendingBlogs />
        <BlogCategory />
        <MonetizationBlog />
        <Footer />
      </div>
    </>
  )
}
export default Home