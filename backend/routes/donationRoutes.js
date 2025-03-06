const express = require("express");
const router = express.Router();
const Donation = require("../models/donationModel");
const { protect } = require("../middleware/authMiddleware");

// Helper function to format dates properly
const parseDate = (dateString) => {
  return dateString ? new Date(dateString) : null;
};

// Create Donation (Donors Only)
router.post("/", protect, async (req, res) => {
  try {
    if (req.user.role !== "donor") {
      return res
        .status(403)
        .json({ message: "Only donors can create donations" });
    }

    const {
      title,
      description,
      quantity,
      expiryDate,
      pickupAddress,
      pickupTimeStart,
      pickupTimeEnd,
      imageUrl,
    } = req.body;

    const donation = await Donation.create({
      title,
      description,
      quantity,
      expiryDate: parseDate(expiryDate),
      pickupAddress,
      pickupTimeStart: parseDate(pickupTimeStart),
      pickupTimeEnd: parseDate(pickupTimeEnd),
      donorId: req.user._id,
      donorName: req.user.name,
      imageUrl,
    });

    res.status(201).json({ ...donation._doc, id: donation._id.toString() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Donations
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });

    res.json(
      donations.map((donation) => ({
        ...donation._doc,
        id: donation._id.toString(),
        expiryDate: donation.expiryDate?.toISOString() || null,
        pickupTimeStart: donation.pickupTimeStart?.toISOString() || null,
        pickupTimeEnd: donation.pickupTimeEnd?.toISOString() || null,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Single Donation by ID
router.get("/:id", async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (donation) {
      res.json({
        ...donation._doc,
        id: donation._id.toString(),
        expiryDate: donation.expiryDate?.toISOString() || null,
        pickupTimeStart: donation.pickupTimeStart?.toISOString() || null,
        pickupTimeEnd: donation.pickupTimeEnd?.toISOString() || null,
      });
    } else {
      res.status(404).json({ message: "Donation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Donation (Donors Only)
router.put("/:id", protect, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation || donation.donorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        expiryDate: parseDate(req.body.expiryDate),
        pickupTimeStart: parseDate(req.body.pickupTimeStart),
        pickupTimeEnd: parseDate(req.body.pickupTimeEnd),
      },
      { new: true }
    );

    res.json(updatedDonation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Donation (Donors Only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation || donation.donorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await donation.deleteOne();
    res.json({ message: "Donation removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
