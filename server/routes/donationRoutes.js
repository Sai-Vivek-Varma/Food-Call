import express from "express";
import Donation from "../models/donationModel.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../utils/imageUpload.js";
import { addNotification } from "../utils/notificationUtils.js";

const router = express.Router();

/**
 * @route   POST /api/donations
 * @desc    Create a new donation (donors only)
 * @access  Private
 */
router.post("/", protect, async (req, res) => {
  try {
    // Ensure the authenticated user is a donor.
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

    // Create a new donation document linked to the donor.
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
      imageUrl,
    });

    // Notify all orphanages about new donation
    const orphanages = await (
      await import("../models/userModel.js")
    ).default.find({ role: "orphanage" });
    await Promise.all(
      orphanages.map((user) =>
        addNotification(user._id, `New donation posted: ${donation.title}`)
      )
    );

    console.log("New donation inserted:", donation);
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/donations
 * @desc    Get all donations (with optional filtering by status)
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const donations = await Donation.find(filter).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/donations/:id
 * @desc    Get a single donation by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (donation) {
      res.json(donation);
    } else {
      res.status(404).json({ message: "Donation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PUT /api/donations/:id
 * @desc    Update a donation (only the donor who created it)
 * @access  Private
 */
router.put("/:id", protect, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // Ensure the authenticated donor is the owner of this donation.
    if (donation.donorId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this donation" });
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

/**
 * @route   DELETE /api/donations/:id
 * @desc    Delete a donation (only allowed for the donor who created it)
 * @access  Private
 */
router.delete("/:id", protect, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // Ensure the donor is the owner.
    if (donation.donorId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this donation" });
    }

    await donation.deleteOne();
    res.json({ message: "Donation removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PUT /api/donations/:id/reserve
 * @desc    Reserve a donation (only orphanages can reserve)
 * @access  Private
 */
router.put("/:id/reserve", protect, async (req, res) => {
  try {
    // Check that the user is an orphanage.
    if (req.user.role !== "orphanage") {
      return res
        .status(403)
        .json({ message: "Only orphanages can reserve donations" });
    }

    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    if (donation.status !== "available") {
      return res
        .status(400)
        .json({ message: "This donation is not available for reservation" });
    }

    // Check if donation is expired
    const now = new Date();
    if (new Date(donation.expiryDate) < now) {
      return res.status(400).json({ message: "This donation has expired" });
    }

    donation.status = "reserved";
    donation.reservedBy = req.user._id;
    donation.reservedByName = req.user.name;
    donation.reservedAt = new Date();
    const updatedDonation = await donation.save();

    // Notify donor about reservation
    await addNotification(
      donation.donorId,
      `Your donation "${donation.title}" has been reserved by ${req.user.name}${
        req.user.organization ? ` (${req.user.organization})` : ""
      }`
    );

    // Here you would typically send a notification to the donor
    // For now, we'll just log it
    console.log(
      `Notification: Donation "${donation.title}" has been reserved by ${req.user.name} (${req.user.organization})`
    );

    res.json({
      ...updatedDonation.toObject(),
      message: "Donation reserved successfully. Donor has been notified.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PUT /api/donations/:id/complete
 * @desc    Mark a donation as completed (only allowed by the donor)
 * @access  Private
 */
router.put("/:id/complete", protect, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }
    // Ensure the donor is the owner.
    if (donation.donorId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to complete this donation" });
    }
    if (donation.status !== "reserved") {
      return res.status(400).json({
        message: "Donation must be reserved before it can be completed",
      });
    }
    donation.status = "completed";
    const updatedDonation = await donation.save();
    res.json(updatedDonation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/donations/user/donor
 * @desc    Get all donations created by the current donor
 * @access  Private
 */
router.get("/user/donor", protect, async (req, res) => {
  try {
    if (req.user.role !== "donor") {
      return res.status(403).json({ message: "Access denied" });
    }
    const donations = await Donation.find({ donorId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/donations/user/reserved
 * @desc    Get all donations reserved by the current orphanage
 * @access  Private
 */
router.get("/user/reserved", protect, async (req, res) => {
  try {
    if (req.user.role !== "orphanage") {
      return res.status(403).json({ message: "Access denied" });
    }
    const donations = await Donation.find({ reservedBy: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   POST /api/donations/upload-image
 * @desc    Upload an image for a donation
 * @access  Private
 */
router.post("/upload-image", protect, upload.single("image"), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: "Image upload failed" });
  }
  res.status(200).json({ imageUrl: req.file.path });
});

/**
 * @route   PUT /api/donations/:id/unreserve
 * @desc    Unreserve a donation (only the orphanage who reserved it)
 * @access  Private
 */
router.put("/:id/unreserve", protect, async (req, res) => {
  try {
    // Only orphanages can unreserve
    if (req.user.role !== "orphanage") {
      return res
        .status(403)
        .json({ message: "Only orphanages can unreserve donations" });
    }
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }
    // Only the orphanage who reserved can unreserve
    if (
      !donation.reservedBy ||
      donation.reservedBy.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to unreserve this donation" });
    }
    if (donation.status !== "reserved") {
      return res.status(400).json({ message: "Donation is not reserved" });
    }
    donation.status = "available";
    donation.reservedBy = undefined;
    donation.reservedByName = undefined;
    donation.reservedAt = undefined;
    const updatedDonation = await donation.save();
    res.json({
      ...updatedDonation.toObject(),
      message: "Donation unreserved and available to others.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
