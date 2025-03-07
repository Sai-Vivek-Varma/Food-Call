// models/donationModel.js
const mongoose = require("mongoose");

const donationSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    pickupAddress: { type: String, required: true },
    pickupTimeStart: { type: String, required: true },
    pickupTimeEnd: { type: String, required: true },
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    donorName: { type: String, required: true },
    imageUrl: { type: String }, // Store the Cloudinary image URL
  },
  {
    timestamps: true,
  }
);

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
