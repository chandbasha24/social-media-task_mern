// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './components/UserForm';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin'; // Import AdminLogin
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Social Media Submission System</h1>
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} /> {/* Add AdminLogin route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
