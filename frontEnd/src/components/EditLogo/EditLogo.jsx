import React, { useState, useRef } from 'react';
import axios from 'axios';

const API_URL = 'https://blog-web-with-admin-panel.onrender.com';

function EditLogo() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setSuccess('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('logo', selectedFile);

    try {
      const res = await axios.post(`${API_URL}/api/logo`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess(res.data.message);
    } catch (error) {
      console.error(error);
      setSuccess('Error uploading logo.');
    }
  };

  return (
    <div className="editor-section">
      <h2>Edit Logo</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <label>Select Logo Image</label>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} />
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit" className="submit-btn">
          Upload / Update Logo
        </button>
      </form>
    </div>
  );
}

export default EditLogo;
