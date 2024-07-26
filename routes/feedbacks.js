const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");
const { authorizeAdmin } = require("../middlewares/authorizeAdmin");
const { authenticateToken } = require("../middlewares/authenticateToken");

// Submit feedback
router.post("/", authenticateToken, async (req, res) => {
  const { message } = req.body;
  const feedback = await Feedback.create({
    message,
    UserId: req.user.id,
  });
  res.json(feedback);
});

// Get all feedbacks (Admin only)
router.get("/", authenticateToken, authorizeAdmin, async (req, res) => {
  const feedbacks = await Feedback.findAll();
  res.json(feedbacks);
});

// Respond to feedback (Admin only)
router.put("/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  const { id } = req.params;
  const { response } = req.body;
  const feedback = await Feedback.findByPk(id);
  if (feedback) {
    feedback.update({ response, status: "resolved" });
    res.json(feedback);
  } else {
    res.status(404).json({ error: "Feedback not found" });
  }
});

module.exports = router;
