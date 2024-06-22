const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  tableNumber: {
    type: Number,
    required: true,
  },
  feedbackText: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
