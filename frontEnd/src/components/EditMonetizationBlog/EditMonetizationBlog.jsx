import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'https://blog-web-with-admin-panel.onrender.com';

function EditMonetizationBlog() {
  const [formData, setFormData] = useState({ EditMonetizationBlog: '' });
  const [blogId, setBlogId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API}/EditMonetizationget`);
        if (res.data) {
          setFormData({ EditMonetizationBlog: res.data.EditMonetizationBlog });
          setBlogId(res.data._id);
        }
      } catch (err) {
        setMessage('Error fetching blog');
      }
    };
    fetchBlog();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (blogId) {
        // PUT request
        await axios.put(`${API}/${blogId}`, formData);
        setMessage('Blog updated successfully!');
      } else {
        // POST request
        const res = await axios.post(`${API}/api/EditMonetization`, formData);
        setBlogId(res.data._id);
        setMessage('Blog created successfully!');
      }
    } catch (err) {
      setMessage('Error saving blog');
    }
  };

  return (
     <div className="editor-section">
    <form onSubmit={handleSubmit} className="form-group">
      <h2>Edit Monetization Blog</h2>
      <textarea
        rows={10}
        cols={100}
        name="EditMonetizationBlog"
        placeholder="Blog"
        value={formData.EditMonetizationBlog }
        onChange={handleInputChange}
      />
      <br />
      <button className="submit-btn" type="submit">{blogId ? 'Update' : 'Create'}</button>
      <p>{message}</p>
    </form>
    </div>
  );
}

export default EditMonetizationBlog;
