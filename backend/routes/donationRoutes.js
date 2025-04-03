
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createDonation,
  getAllDonations,
  getDonationsByDonor,
  getReservedDonations,
  reserveDonation,
  completeDonation,
  getDonationById
} = require('../controllers/donationController');

// Public routes
router.get('/', getAllDonations);
router.get('/:id', getDonationById);

// Protected routes
router.post('/', protect, createDonation);
router.get('/user/donor', protect, getDonationsByDonor);
router.get('/user/reserved', protect, getReservedDonations);
router.put('/:id/reserve', protect, reserveDonation);
router.put('/:id/complete', protect, completeDonation);

module.exports = router;
