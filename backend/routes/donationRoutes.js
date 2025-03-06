const express = require('express');
const router = express.Router();
const Donation = require('../models/donationModel');
const { protect } = require('../middleware/authMiddleware');
// Create a new donation (donors only)
router.post('/', protect, async (req, res) => {
  try {
    if (req.user.role !== 'donor') {
      return res.status(403).json({ message: 'Only donors can create donations' });
    }
    const {
      title,
      description,
      quantity,
      expiryDate,
      pickupAddress,
      pickupTimeStart,
      pickupTimeEnd,
      imageUrl
    } = req.body;
    const donation = await Donation.create({
      title,
      description,
      quantity,
      expiryDate,
      pickupAddress,
      pickupTimeStart,
      pickupTimeEnd,
      donorId: req.user._id,
      donorName: req.user.name,
      imageUrl
    });
    console.log("New donation inserted:", donation);
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get all donations (optionally filtered by status)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const donations = await Donation.find(filter).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Additional endpoints (GET by id, update, delete, reserve, complete, etc.)...
// [Omitted here for brevity; use your provided code for the rest.]

// @route   GET /api/donations/:id
// @desc    Get a single donation by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (donation) {
      res.json(donation);
    } else {
      res.status(404).json({ message: 'Donation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// @route   PUT /api/donations/:id
// @desc    Update a donation
// @access  Private (donation owner only)
router.put('/:id', protect, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    // Check if user is the donor of this donation
    if (donation.donorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this donation' });
    }
    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDonation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// @route   DELETE /api/donations/:id
// @desc    Delete a donation
// @access  Private (donation owner only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    // Check if user is the donor of this donation
    if (donation.donorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this donation' });
    }
    await donation.deleteOne();
    res.json({ message: 'Donation removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// @route   PUT /api/donations/:id/reserve
// @desc    Reserve a donation
// @access  Private (orphanages only)
router.put('/:id/reserve', protect, async (req, res) => {
  try {
    // Check if user is an orphanage
    if (req.user.role !== 'orphanage') {
      return res.status(403).json({ message: 'Only orphanages can reserve donations' });
    }
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    if (donation.status !== 'available') {
      return res.status(400).json({ message: 'This donation is not available for reservation' });
    }
    donation.status = 'reserved';
    donation.reservedBy = req.user._id;
    donation.reservedByName = req.user.name;
    const updatedDonation = await donation.save();
    res.json(updatedDonation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// @route   PUT /api/donations/:id/complete
// @desc    Mark a donation as completed
// @access  Private (donation owner only)
router.put('/:id/complete', protect, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    // Check if user is the donor of this donation
    if (donation.donorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to complete this donation' });
    }
    if (donation.status !== 'reserved') {
      return res.status(400).json({ message: 'This donation must be reserved before it can be completed' });
    }
    donation.status = 'completed';
    const updatedDonation = await donation.save();
    res.json(updatedDonation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// @route   GET /api/donations/user/donor
// @desc    Get all donations by current donor
// @access  Private (donors only)
router.get('/user/donor', protect, async (req, res) => {
  try {
    // Check if user is a donor
    if (req.user.role !== 'donor') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const donations = await Donation.find({ donorId: req.user._id }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// @route   GET /api/donations/user/reserved
// @desc    Get all donations reserved by current orphanage
// @access  Private (orphanages only)
router.get('/user/reserved', protect, async (req, res) => {
  try {
    // Check if user is an orphanage
    if (req.user.role !== 'orphanage') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const donations = await Donation.find({ reservedBy: req.user._id }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
