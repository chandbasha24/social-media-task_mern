import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../AdminDashboard.css'; // Import your CSS file

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://social-media-task-mern.onrender.com/api/users');
      setUsers(response.data);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    // Clear stored user data or token if necessary
    // localStorage.removeItem('token'); // Uncomment if using localStorage
    alert('Logged out successfully'); // Show logout alert
    navigate('/'); // Redirect to UserForm after logout
  };

  const navigateToUserForm = () => {
    navigate('/'); // Navigate to UserForm
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="user-cards-container">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <h3>User Name: {user.name}</h3>
            <p>Social Media Handle By: {user.socialHandle}</p>
            <div className="image-gallery">
              {user.images.map((image, index) => (
                <img
                  key={index}
                  src={`https://social-media-task-mern.onrender.com/${image}`}
                  alt="user upload"
                  className="thumbnail"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
