// Import necessary hooks and libraries
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { BASE_URL } from "../localhost/localhost.jsx";   
// API base URL for backend
const API_URL = `${BASE_URL}`;

function EditAboutCard() {
  // ✅ Function to delete a banner by ID
  const handleDelete = async (bannerId) => {

    const confirmDelete = window.confirm('Are you sure you want to delete this banner?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/api/AboutCard/${bannerId}`); // API call to delete
      setSuccess('Banner deleted successfully!');
      fetchBanners(); // Refresh the banner list after deletion
      if (selectedBannerId === bannerId) {
        setSelectedBannerId('Create'); // Reset form
        clearForm(); // Clear form fields
      }
    } catch (err) {
      setError('Failed to delete the banner.');
    }
  };

  // State for section navigation (not used here but maybe elsewhere)
  const [activeSection, setActiveSection] = useState('Home');

  // State variables for form logic
  const [banners, setBanners] = useState([]); // List of all banners
  const [selectedBannerId, setSelectedBannerId] = useState('Create'); // For edit/create dropdown
  const [formData, setFormData] = useState({
    category: '',
    title: '',

  });
  const [selectedFile, setSelectedFile] = useState(null); // Holds selected image file
  const [error, setError] = useState(''); // Error message
  const [success, setSuccess] = useState(''); // Success message

  const fileInputRef = useRef(null); // Used to reset file input field

  // 🔄 Fetch all banners from the backend
  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${API_URL}/AboutCard`);
      setBanners(response.data);
    } catch (err) {
      setError('Failed to fetch banners.');
    }
  };

  // Run only once on component mount
  useEffect(() => {
    fetchBanners();
  }, []);

  // Handle form input field changes (text fields)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change (image file)
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Reset form fields and file input
  const clearForm = () => {
    setFormData({ category: '', title: '' });
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = ''; // Reset file input field
    setError('');
  };

  // Handle dropdown change to either edit or create mode
  const handleDropdownChange = (e) => {
    const id = e.target.value;
    setSelectedBannerId(id);
    setError('');
    setSuccess('');

    if (id === 'Create') {
      clearForm(); // New entry
    } else {
      const selected = banners.find(b => b._id === id); // Load banner to edit
      if (selected) {
        setFormData({
          category: selected.category,
          title: selected.title,

        });
        setSelectedFile(null); // Reset file input
      }
    }
  };

  // Form submission handler: handles both create and update logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 🛑 Validate inputs
    if (!formData.category || !formData.title) {
      setError('All text fields must be filled.');
      return;
    }

    if (selectedBannerId === 'Create' && !selectedFile) {
      setError('An image file must be selected for a new banner.');
      return;
    }

    // 📦 Prepare FormData for sending image + text data
    const data = new FormData();
    data.append('category', formData.category);
    data.append('title', formData.title);

    if (selectedFile) {
      data.append('bannerImage', selectedFile); // Key must match multer config
    }

    try {
      let response;
      if (selectedBannerId === 'Create') {
        // 🔨 CREATE new banner
        console.log(data)
        response = await axios.post(`${API_URL}/api/AboutCard`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccess('Banner created successfully!');
      } else {
        // 🛠️ UPDATE existing banner
        response = await axios.put(`${API_URL}/AboutCard/${selectedBannerId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccess('Banner updated successfully!');
      }

      fetchBanners(); // Refresh list
      setSelectedBannerId('Create'); // Reset form
      clearForm();

    } catch (err) {
      const errorMessage = err.response?.data?.title || 'An error occurred.';
      setError(errorMessage);
    }
  };

  // 🖼️ JSX returned to render the component
  return (
    <div className="editor-section">
      <h2>Edit Banner</h2>
      <form onSubmit={handleSubmit} className="form-group">

        {/* Dropdown to select banner to edit or create */}
        <label>Select Banner to Edit or Create New:</label>
        <select value={selectedBannerId} onChange={handleDropdownChange}>
          <option value="Create">-- Create New Banner --</option>
          {banners.map((banner) => (
            <option key={banner._id} value={banner._id}>
              {banner.category}
            </option>
          ))}
        </select>

        {/* 🗑️ Banner delete buttons */}
        <ul className="banner-list">
          {banners.map((banner) => (
            <li key={banner._id} style={{ marginTop: '6px' }}>
              {banner.category}
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

        {/* Input fields for form */}
        <label>Tagline</label>
        <input
          type="text"
          name="category"
          placeholder="Banner Tagline"
          value={formData.category}
          onChange={handleInputChange}
        />

        <label>Message</label>
        <input
          type="text"
          name="title"
          placeholder="Banner Message"
          value={formData.title}
          onChange={handleInputChange}
        />



        {/* File input for image */}
        <label>Banner Image</label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}

        {/* 🔴 Error and ✅ Success messages */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        {/* Submit button */}
        <button type="submit" className="submit-btn">
          {selectedBannerId === 'Create' ? 'Create Banner' : 'Update Banner'}
        </button>
      </form>
    </div>
  );
}

export default EditAboutCard;
