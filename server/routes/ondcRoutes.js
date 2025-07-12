const express = require("express");
const router = express.Router();
const { bookOndcDelivery } = require("../services/ondcService");

// POST /api/ondc/book
router.post("/book", async (req, res) => {
  try {
    const { donationId, pickupAddress } = req.body;
    // Add more fields as needed (drop address, user info, etc.)
    const result = await bookOndcDelivery({ donationId, pickupAddress });
    res.json({ status: "success", ...result });
  } catch (error) {
    console.error("ONDC booking error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
