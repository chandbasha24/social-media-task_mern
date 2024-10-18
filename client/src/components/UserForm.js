// UserForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../UserForm.css';
function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    socialHandle: '',
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      images: e.target.files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('socialHandle', formData.socialHandle);
    Array.from(formData.images).forEach((file) => {
      data.append('images', file);
    });

    try {
      await axios.post('https://social-media-task-mern.onrender.com/api/users/submit', data);
      alert('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting the form', error);
    }
  };

  return (
    <div className="user-form">
      <h2>User Submission Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label>Social Media Handle:</label>
        <input
          type="text"
          name="socialHandle"
          value={formData.socialHandle}
          onChange={handleInputChange}
          required
        />

        <label>Upload Images:</label>
        <input type="file" name="images" multiple onChange={handleImageChange} />

        <button type="submit">Submit</button>
        <Link to="/admin/login" style={{ marginLeft: '10px' }}>Admin Login</Link> {/* Admin login link */}
        </form>
     
    </div>
  );
}

export default UserForm;
