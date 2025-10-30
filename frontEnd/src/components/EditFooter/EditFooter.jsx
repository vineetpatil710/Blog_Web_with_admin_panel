import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from "../localhost/localhost.jsx";   
const API_URL = `${BASE_URL}`;

function EditFooter() {
  const [formData, setFormData] = useState({
    text1: '',
    text2: '',
    text3: '',
    color: '#000000'
  });
  const [footerId, setFooterId] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/Footer`).then((res) => {
      if (res.data) {
        setFormData(res.data);
        setFooterId(res.data._id);
      }
    });
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (footerId) {
        await axios.put(`${API_URL}/Footer/${footerId}`, formData);
      } else {
        const res = await axios.post(`${API_URL}/api/Footer`, formData);
        setFooterId(res.data._id);
      }
      alert('Saved successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving');
    }
  };

  return (
    <div className="editor-section">
      <h2>Edit Footer</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input type="text" name="text1" value={formData.text1} onChange={handleChange} placeholder="Text 1" />
        <input type="text" name="text2" value={formData.text2} onChange={handleChange} placeholder="Text 2" />
        <input type="text" name="text3" value={formData.text3} onChange={handleChange} placeholder="Text 3" />
        <input style={{
          width: '60px',
          height: '40px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: '#fff',
          borderRadius: '6px',
          boxShadow: '0 0 4px rgba(0,0,0,0.2)',
        }} type="color" name="color" value={formData.color} onChange={handleChange} />
        <button type="submit" className="submit-btn">Save Footer</button>
      </form>
    </div>
  );
}

export default EditFooter;
