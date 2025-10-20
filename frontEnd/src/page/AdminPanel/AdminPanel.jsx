// AdminPanel.js
import  {  useState } from 'react';
import './AdminPanel.css';
import EditBanner from '../../../src/components/EditBanner/EditBanner.jsx';
import EditTrendingBlogs from '../../../src/components/EditTrendingBlogs/EditTrendingBlogs.jsx';
import EditBlogCategories from '../../../src/components/EditBlogCategories/EditBlogCategories.jsx';
import EditMonetizationBlog from  '../../../src/components/EditMonetizationBlog/EditMonetizationBlog.jsx';
import EditBackgroundColor from '../../../src/components/EditBackgroundColor/EditBackgroundColor.jsx';
import EditFooter from '../../../src/components/EditFooter/EditFooter.jsx';
import EditAboutText from '../../components/EditAboutText/EditAboutText.jsx'
import EditAboutCard from '../../components/EditAboutCard/EditAboutCard.jsx'
import EditLogo from '../../components/EditLogo/EditLogo.jsx'
import EditHeaderColor from '../../components/EditHeaderColor/EditHeaderColor.jsx'

function AdminPanel() {
  // State for navigation
  const [activeSection, setActiveSection] = useState('Home');
  const renderSection = () => {
    switch (activeSection) {
      case 'Home':
        return (
         <>
<EditBanner/>
<EditTrendingBlogs/>
<EditBlogCategories/>
<EditMonetizationBlog/>
<EditBackgroundColor/>
<EditFooter/>
<EditLogo/>
<EditHeaderColor/>
         </>
        );
      // Other cases (About, Categories, etc.) remain the same
      case 'About': return <div className="editor-section">
        <EditAboutText/>
        <EditAboutCard/>
      </div>;
      case 'Categories': return <div className="editor-section"><h2>Categories</h2></div>;
      case 'Contact': return <div className="editor-section"><h2>Contact</h2></div>;
      default: return null;
    }
  };
  return (
    <div className="admin-panel">
      <h1 className="admin-title">Admin Panel</h1>
      <div className="admin-nav">
        <button className={activeSection === 'Home' ? 'active' : ''} onClick={() => setActiveSection('Home')}>Home</button>
        <button className={activeSection === 'About' ? 'active' : ''} onClick={() => setActiveSection('About')}>About</button>
        <button className={activeSection === 'Categories' ? 'active' : ''} onClick={() => setActiveSection('Categories')}>Categories</button>
        <button className={activeSection === 'Contact' ? 'active' : ''} onClick={() => setActiveSection('Contact')}>Contact</button>
      </div>
      {renderSection()}
    </div>
  );
}
export default AdminPanel;