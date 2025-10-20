import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

function EditBlogCategories() {


  const [banners, setBanners] = useState([]);
  const [selectedBannerId, setSelectedBannerId] = useState('Create');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    posts: '',

    category: 'Community', // default category
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fileInputRef = useRef(null);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${API_URL}/BlogCategories`);
      setBanners(response.data);
    } catch (err) {
      setError('Failed to fetch banners.');
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const clearForm = () => {
    setFormData({ title: '', author: '', posts: '', category: 'Community' });
    setSelectedFile(null);
    fileInputRef.current.value = '';
    setError('');
    setSuccess('');
  };

  const handleDropdownChange = (e) => {
    const id = e.target.value;
    setSelectedBannerId(id);
    setError('');
    setSuccess('');

    if (id === 'Create') {
      clearForm();
    } else {
      const selected = banners.find(b => b._id === id);
      if (selected) {
        setFormData({
          title: selected.title,
          author: selected.author,
          posts: selected.posts,
          category: selected.category || 'Community',
        });
        setSelectedFile(null);
      }
    }
  };

  const handleDelete = async (bannerId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this banner?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/api/BlogCategories/${bannerId}`);
      setSuccess('Banner deleted successfully!');
      fetchBanners();
      if (selectedBannerId === bannerId) {
        setSelectedBannerId('Create');
        clearForm();
      }
    } catch (err) {
      setError('Failed to delete the banner.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');


    function calculateReadingTime(text) {
      const wordsPerMinute = 200; // Average reading speed
      const words = text.trim().split(/\s+/).length;
      const minutes = Math.ceil(words / wordsPerMinute);
      return `${minutes} min read`;
    }
    const readingTime = calculateReadingTime(formData.posts);

    if (selectedBannerId === 'Create' && !selectedFile) {
      setError('An image file must be selected for a new banner.');
      return;
    }

    const data = new FormData();
    data.append('category', formData.category);
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('date', new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
    data.append('readTime', readingTime);
    data.append('posts', formData.posts);

    if (selectedFile) {
      data.append('bannerImage', selectedFile);
    }
    console.log(data);

    try {
      let response;
      if (selectedBannerId === 'Create') {
        response = await axios.post(`${API_URL}/api/BlogCategories`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccess('Banner created successfully!');
      } else {
        response = await axios.put(`${API_URL}/BlogCategories/${selectedBannerId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccess('Banner updated successfully!');
      }

      fetchBanners();
      setSelectedBannerId('Create');
      clearForm();
    } catch (err) {
      const errorMessage = err.response?.data?.author || 'An error occurred.';
      setError(errorMessage);
    }
  };

  return (
    <div className="editor-section">
      <h2>Edit Blog Categories</h2>
      <form onSubmit={handleSubmit} className="form-group">

        {/* Dropdown to select banner to edit or create */}
        <label>Select Blog Categories to Edit or Create New:</label>
        <select value={selectedBannerId} onChange={handleDropdownChange}>
          <option value="Create">-- Create New Banner --</option>
          {banners.map((banner) => (
            <option key={banner._id} value={banner._id}>
              {banner.title}
            </option>
          ))}
        </select>

        {/* Delete buttons */}
        <ul className="banner-list">
          {banners.map((banner) => (
            <li key={banner._id} style={{ marginTop: '6px' }}>
              {banner.title}
              <button
                style={{
                  marginLeft: '10px',
                  padding: '2px 6px',
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px'
                }}
                onClick={() => handleDelete(banner._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {/* Category dropdown */}
        <label>Select Blog category</label>
        <select name="category" value={formData.category} onChange={handleInputChange}>
          <option value="Community">Community</option>
          <option value="Company">Company</option>
          <option value="Culture">Culture</option>
          <option value="Technology">Technology</option>
        </select>

        {/* Input fields */}
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
        />

        <label>Author</label>
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleInputChange}
        />

        <label>Blog</label>
        <textarea
          rows={10}
          cols={150}
          type="text"
          name="posts"
          placeholder="Blog"
          value={formData.posts}

          onChange={handleInputChange}
        />

        {/* File upload */}
        <label>Banner Image</label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}

        {/* Messages */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        {/* Submit */}
        <button type="submit" className="submit-btn">
          {selectedBannerId === 'Create' ? 'Create Banner' : 'Update Banner'}
        </button>
      </form>
    </div>
  );
}

export default EditBlogCategories;
