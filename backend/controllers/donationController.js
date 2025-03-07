
const Donation = require('../models/donationModel');
const User = require('../models/userModel');
const { uploadBase64Image } = require('../utils/cloudinary');

// Create a new donation
const createDonation = async (req, res) => {
  try {
    const { title, description, quantity, expiryDate, pickupAddress, pickupTimeStart, pickupTimeEnd, imageUrl } = req.body;
    const userId = req.user.id;
    
    // Get user info to include donorName
    const user = await User.findById(userId);
    
    let uploadedImageUrl = null;
    // Check if there's a base64 image to upload
    if (imageUrl && imageUrl.includes('base64')) {
      uploadedImageUrl = await uploadBase64Image(imageUrl);
    } else {
      uploadedImageUrl = imageUrl; // Keep the existing URL if it's not a base64 image
    }

    const donation = new Donation({
      title,
      description,
      quantity,
      expiryDate,
      pickupAddress,
      pickupTimeStart,
      pickupTimeEnd,
      donorId: userId,
      donorName: user.name,
      imageUrl: uploadedImageUrl
    });

    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ message: 'Server error when creating donation' });
  }
};

// Get all available donations
const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ status: 'available' }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ message: 'Server error when fetching donations' });
  }
};

// Get donations by donor
const getDonationsByDonor = async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.user.id }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations by donor:', error);
    res.status(500).json({ message: 'Server error when fetching donations by donor' });
  }
};

// Get reserved donations by orphanage
const getReservedDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ 
      reservedBy: req.user.id,
      status: { $in: ['reserved', 'completed'] }
    }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    console.error('Error fetching reserved donations:', error);
    res.status(500).json({ message: 'Server error when fetching reserved donations' });
  }
};

// Reserve a donation
const reserveDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    if (donation.status !== 'available') {
      return res.status(400).json({ message: 'This donation is not available' });
    }
    
    // Get orphanage name
    const user = await User.findById(req.user.id);
    
    donation.status = 'reserved';
    donation.reservedBy = req.user.id;
    donation.reservedByName = user.name;
    
    await donation.save();
    res.json(donation);
  } catch (error) {
    console.error('Error reserving donation:', error);
    res.status(500).json({ message: 'Server error when reserving donation' });
  }
};

// Complete a donation
const completeDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    if (donation.status !== 'reserved') {
      return res.status(400).json({ message: 'This donation must be reserved before being completed' });
    }
    
    if (donation.reservedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to complete this donation' });
    }
    
    donation.status = 'completed';
    await donation.save();
    res.json(donation);
  } catch (error) {
    console.error('Error completing donation:', error);
    res.status(500).json({ message: 'Server error when completing donation' });
  }
};

// Get a specific donation by ID
const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    res.json(donation);
  } catch (error) {
    console.error('Error fetching donation:', error);
    res.status(500).json({ message: 'Server error when fetching donation' });
  }
};

module.exports = {
  createDonation,
  getAllDonations,
  getDonationsByDonor,
  getReservedDonations,
  reserveDonation,
  completeDonation,
  getDonationById
};
