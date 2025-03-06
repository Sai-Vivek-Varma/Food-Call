const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Temporary bypass for testing – set a dummy donor with a valid ObjectId.
const protect = async (req, res, next) => {
  req.user = {
    _id: '64288c9f1a2f4f00123abcd4', // A valid 24-character hex string
    name: 'Test Donor',
    role: 'donor'
  };
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, isAdmin };
