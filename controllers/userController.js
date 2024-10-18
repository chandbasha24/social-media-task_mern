const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/userModel');

// Setting up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);  // Creates 'uploads' folder if it doesn't exist
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generating unique filename: CurrentDate + OriginalFilename
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // Max file size: 10 MB
}).array('images', 10); // Allow up to 10 images at once

// Create new user submission
const createUser = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Image upload failed', error: err });
    }

    // Create new user object
    const newUser = new User({
      name: req.body.name,
      socialHandle: req.body.socialHandle,
      images: req.files.map(file => file.path)  // Storing paths of uploaded images
    });

    // Save user data to database
    newUser.save()
      .then(user => res.status(201).json(user))
      .catch(error => res.status(500).json({ message: 'Database error', error }));
  });
};

// Fetch all users (to display on the admin dashboard)
const getUsers = (req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json({ message: 'Database error', error }));
};

module.exports = { createUser, getUsers };
