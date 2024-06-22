const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
  },
  orderDetails: {
    type: Array,
    required: true,
    default: [],
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "completed"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
