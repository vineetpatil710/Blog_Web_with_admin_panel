
import React, { useState, useEffect, useRef} from 'react';
import './blogCategory.css'; // Import the CSS file
import axios from 'axios';

export default function BlogCategory() {

 const [banners, setBanners] = useState([]);


  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // Make sure the URL matches your backend server's address and port
        const response = await axios.get('http://localhost:5000/BlogCategories');
        setBanners(response.data);
      } catch (err) {
        console.error('Error fetching banners:', err);
      } 
    };

    fetchBanners();
  }, []);


const blogPosts =banners.map((banner) => ({
  id: banner._id,
        category:banner.category,
        imageUrl:  `http://localhost:5000${banner.imageUrl}`,
        title: banner.title,
        author: banner.author,
        date: banner.date,
        readTime: banner.readTime,
        posts: banner.posts,
}));
// SVG Icon for the navigation arrows
const ArrowIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);
    const categories = ["All Categories", "Community", "Company", "Culture", "Technology"];
    const [selectedCategory, setSelectedCategory] = useState("All Categories");

    const filteredPosts = blogPosts.filter(post =>
        selectedCategory === "All Categories" || post.category === selectedCategory
    );
    return (
          <>
            <div className="blog-container">

                {/* Header Section */}
                <header className="header">
                    <h1 className="header-title">Blog Categories</h1>
                    <nav className="categories-nav">
                        <button className="nav-arrow-button">
                            <ArrowIcon className="arrow-icon-left" />
                        </button>
                        <div className="categories-list">
                            {categories.map((cat, index) => (
                                <a
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedCategory(cat);
                                    }}
                                    key={index}
                                    href="#"
                                    className={`category-link ${selectedCategory === cat ? 'active' : ''}`}
                                >
                                    {cat}
                                </a>
                            ))}
                        </div>
                        <button className="nav-arrow-button">
                            <ArrowIcon className="arrow-icon-right" />
                        </button>
                    </nav>
                </header>

                {/* Blog Posts Grid */}
                <main className="posts-grid">
                    {filteredPosts.map((post) => (
                        <article key={post.id} className="post-article group">
                            <div className="post-image-container">
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="post-image"
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/f87171/ffffff?text=Image+Error'; }}
                                />
                                <span className="post-category-badge">{post.category}</span>
                            </div>
                            <div className="post-content">
                                <p className="post-meta">
                                    | {post.date} | {post.author} 
                                </p>
                                <h2 className="post-titlee">
                                    {post.title}
                                </h2>
                               <p className="post-excerpt">
  {post.posts.split(" ").length > 10 ? (
    <>
      {post.posts.split(" ").slice(0, 10).join(" ")}{" "}
      <a href="https://www.w3schools.com" className="text-blue-500 underline"> Read More
      </a>
    </>
  ) : (
    post.posts
  )}
</p>
                            </div>
                        </article>
                    ))}
                </main>

                {/* "See More" Button Section */}
                <footer className="footer">
                    <button className="see-more-button">
                        See More Blogs
                    </button>
                </footer>
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