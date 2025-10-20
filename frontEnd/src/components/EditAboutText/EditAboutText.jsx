import React, { useEffect, useState } from 'react';
import axios from 'axios';


const API_URL = 'https://blog-web-with-admin-panel.onrender.com'; // Your API endpoint

function EditAboutText() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    posts: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch existing about text on mount
  useEffect(() => {
    axios.get(`${API_URL}/AboutText`)
      .then((res) => {
        if (res.data) {
          setFormData(res.data); // Set data if exists
        }
      })
      .catch((err) => {
        console.error('Error fetching about text:', err);
      });
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/AboutText`, formData); // This will upsert
      setSuccess('Saved successfully!');
      setError('');
    } catch (err) {
      setError('Error saving data.');
      setSuccess('');
      console.error(err);
    }
  };

  return (
    <div className="editor-section">
      <h2>Edit About Text</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <label>Subtitle</label>
        <input
          type="text"
          name="title"
          placeholder="subtitle"
          value={formData.title}
          onChange={handleInputChange}
        />

        <label>Title</label>
        <input
          type="text"
          name="author"
          placeholder="Title"
          value={formData.author}
          onChange={handleInputChange}
        />

        <label>Description</label>
        <textarea
          rows={10}
          cols={150}
          name="posts"
          placeholder="Description"
          value={formData.posts}
          onChange={handleInputChange}
        />

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit" className="submit-btn">
          Save About Text
        </button>
      </form>
    </div>
  );
}

export default EditAboutText;
