// adminController.js
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For token generation

// Hardcoded admin credentials (for demonstration purposes)
const adminCredentials = {
  username: 'admin', // Replace with your admin username
  password: 'admin123' // Replace with your hashed password
};

// Login function
const adminLogin = (req, res) => {
  const { username, password } = req.body;

  // Check if credentials match
  if (username === adminCredentials.username && password === adminCredentials.password) {
    // Generate a token (you can use a secret key from your environment variables)
    const token = jwt.sign({ username }, 'your_secret_key', { expiresIn: '1h' });

    return res.status(200).json({ success: true, token });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
};

module.exports = { adminLogin };
