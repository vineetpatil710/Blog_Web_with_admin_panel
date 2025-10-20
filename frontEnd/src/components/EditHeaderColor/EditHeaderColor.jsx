import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

function EditHeaderColor() {
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [success, setSuccess] = useState('');


  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/color`, { color: selectedColor });
      setSuccess(res.data.message);
    } catch (error) {
      console.error(error);
      setSuccess('Error saving color.');
    }
  };

  return (
    <div className="editor-section">
      <h2>Edit Header Color</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <label>Select Header Background Color</label>
        <input style={{
          width: '60px',
          height: '40px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: '#fff',
          borderRadius: '6px',
          boxShadow: '0 0 4px rgba(0,0,0,0.2)',
        }} type="color" value={selectedColor} onChange={handleColorChange} />
        <button type="submit" className="submit-btn">Save / Update</button>
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
}

export default EditHeaderColor;
