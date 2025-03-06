const mongoose = require('mongoose');
const donationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: String,
    required: true,
    trim: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  pickupAddress: {
    type: String,
    required: true,
    trim: true
  },
  pickupTimeStart: {
    type: Date,
    required: true
  },
  pickupTimeEnd: {
    type: Date,
    required: true
  },
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  donorName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'completed', 'expired'],
    default: 'available'
  },
  reservedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reservedByName: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  imageUrl: {
    type: String
  }
});
const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;
