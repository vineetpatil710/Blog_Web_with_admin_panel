import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from "../localhost/localhost.jsx";   
const API_URL = `${BASE_URL}`;

function EditBackgroundColor() {
  const [color, setColor] = useState('#ffffff');
  const [existingId, setExistingId] = useState(null);

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const res = await axios.get(`${API_URL}/BackgroundColor`);
        if (res.data && res.data._id) {
          setColor(res.data.color);
          setExistingId(res.data._id);
        }
      } catch (err) {
        console.error('Error fetching color:', err.message);
      }
    };
    fetchColor();
  }, []);

  const handleSubmit = async (e) => {

    try {
      if (existingId) {
        await axios.put(`${API_URL}/BackgroundColor/${existingId}`, { color });
        alert('Background color updated!');
      } else {
        await axios.post(`${API_URL}/api/BackgroundColor`, { color });
        alert('Background color saved!');
      }
    } catch (err) {
      console.error('Error saving/updating color:', err.message);
    }
  };

  return (
    <div className="editor-section">
      <h2>Edit Background Color</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{
            width: '60px',
            height: '40px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#fff',
            borderRadius: '6px',
            boxShadow: '0 0 4px rgba(0,0,0,0.2)',
          }}
        />
        <button type="submit" className="submit-btn">
          Save Color
        </button>
      </form>
    </div>
  );
}

export default EditBackgroundColor;
