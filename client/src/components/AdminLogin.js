// AdminLogin.js 
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import '../AdminLogin.css';

function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://social-media-task-mern.onrender.com/api/admin/login', credentials);
      // Assuming the server returns a token or success message
      if (response.data.success) {
        // Save token or user data in local storage or context
        toast.success('Login successful'); // Show success toast
        navigate('/admin'); // Redirect to the admin dashboard
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      toast.error('Login failed. Please check your credentials.'); // Show error toast
      console.error(err);
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <ToastContainer /> {/* Add ToastContainer to render toasts */}
    </div>
  );
}

export default AdminLogin;
