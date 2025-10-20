// AdminPanel.js
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

// --- Configuration ---
// Make sure this URL points to your backend server.
const API_URL = 'https://blog-web-with-admin-panel.onrender.com';

function EditTrendingBlogs() {
  //✅ 1. Add the handleDelete function inside your AdminPanel component:
  const handleDelete = async (bannerId) => {
    console.log(bannerId)
    const confirmDelete = window.confirm('Are you sure you want to delete this banner?');
    if (!confirmDelete) return;
    try {
      await axios.delete(`${API_URL}/api/TrendingBlogs/${bannerId}`);
      setSuccess('Trending Blogs deleted successfully!');
      fetchBanners(); // Refresh the banner list
      if (selectedBannerId === bannerId) {
        setSelectedBannerId('Create');
        clearForm();
      }
    } catch (err) {
      setError('Failed to delete the banner.');
    }
  };
  // State for form data and logic
  const [TrendingBlogs, setBanners] = useState([]);
  const [selectedBannerId, setSelectedBannerId] = useState('Create');
  const [formData, setFormData] = useState({
    BlogTitle: '',
    AgeRatings: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  // --- Data Fetching ---
  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${API_URL}/TrendingBlogs`);
      setBanners(response.data);
    } catch (err) {
      setError('Failed to fetch Trending Blogs.');
    }
  };

  // Fetch TrendingBlogs on initial component mount
  useEffect(() => {
    fetchBanners();
  }, []);

  // --- Event Handlers ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const clearForm = () => {
    setFormData({ BlogTitle: '', AgeRatings: '' });
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setError('');
  }

  const handleDropdownChange = (e) => {
    const id = e.target.value;
    setSelectedBannerId(id);

    // Clear previous messages
    setError('');
    setSuccess('');

    if (id === 'Create') {
      clearForm();
    } else {
      const selected = TrendingBlogs.find(b => b._id === id);
      if (selected) {
        setFormData({
          BlogTitle: selected.BlogTitle,
          AgeRatings: selected.AgeRatings,

        });
        setSelectedFile(null); // Clear file input when loading existing data
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // --- Validation ---
    if (!formData.BlogTitle || !formData.AgeRatings) {
      setError('All text fields must be filled.');
      return;
    }
    // A file is required only when creating a new banner
    if (selectedBannerId === 'Create' && !selectedFile) {
      setError('An image file must be selected for a new banner.');
      return;
    }



    // --- Form Data Preparation ---
    const data = new FormData();
    data.append('BlogTitle', formData.BlogTitle);
    data.append('AgeRatings', formData.AgeRatings);

    if (selectedFile) {
      // 'bannerImage' must match the key used in the backend's multer config
      data.append('bannerImage', selectedFile);
    }

    try {
      let response;
      if (selectedBannerId === 'Create') {
        // --- CREATE ---
        response = await axios.post(`${API_URL}/api/TrendingBlogs`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccess('Trending Blogs created successfully!');
      } else {
        // --- UPDATE ---
        response = await axios.put(`${API_URL}/TrendingBlog/${selectedBannerId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccess('Trending Blogs updated successfully!');
      }

      // Refresh banner list, reset form to "Create" mode
      fetchBanners();
      setSelectedBannerId('Create');
      clearForm();

    } catch (err) {
      const errorMessage = err.response?.data?.AgeRatings || 'An error occurred.';
      setError(errorMessage);
    }
  };


  return (
    <>   <div className="editor-section">
      <h2>Edit Trending Blogs</h2>
      <form onSubmit={handleSubmit} className="form-group">

        <label>Select Trending Blogs to Edit or Create New:</label>
        <select value={selectedBannerId} onChange={handleDropdownChange}>
          <option value="Create">-- Create New Trending Blogs --</option>
          {TrendingBlogs.map((banner) => (
            <option key={banner._id} value={banner._id}>
              {banner.BlogTitle}
            </option>
          ))}


        </select>
        {/* Banner delete list */}
        <ul className="banner-list">
          {TrendingBlogs.map((banner) => (
            <li key={banner._id} style={{ marginTop: '6px' }}>
              {banner.BlogTitle}
              <button
                style={{ marginLeft: '10px', padding: '2px 6px', background: 'red', color: 'white', border: 'none', borderRadius: '4px' }}
                onClick={() => handleDelete(banner._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>


        <label>Blog Title</label>
        <input
          type="text"
          name="BlogTitle"
          placeholder="Blog Title"
          value={formData.BlogTitle}
          onChange={handleInputChange}
        />

        <label>Age Ratings</label>
        <input
          type="text"
          name="AgeRatings"
          placeholder="Age Ratings"
          value={formData.AgeRatings}
          onChange={handleInputChange}
        />
        <label>Trending Blogs Image</label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}

        {/* Status Messages */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit" className="submit-btn">
          {selectedBannerId === 'Create' ? 'Create Banner' : 'Update Trending Blogs'}
        </button>
      </form>
    </div></>
  );
}

export default EditTrendingBlogs;
