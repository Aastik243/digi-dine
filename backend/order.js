const Order = require("./models/Order");
const connectDB = require("./db");

// Ensure database connection
connectDB();

const saveOrder = async (tableNumber, orderDetails) => {
  // Check if there's an active order for the table
  const existingOrder = await Order.findOne({ tableNumber, status: "active" });
  if (existingOrder) {
    // Update existing order
    existingOrder.orderDetails = orderDetails;
    const updatedOrder = await existingOrder.save();
    return updatedOrder;
  } else {
    // Create a new order
    const newOrder = new Order({
      tableNumber,
      orderDetails,
    });
    const savedOrder = await newOrder.save();
    return savedOrder;
  }
};

const completeOrder = async (tableNumber) => {
  const completedOrder = await Order.findOneAndUpdate(
    { tableNumber, status: "active" },
    { status: "completed", completedAt: new Date() },
    { new: true }
  );

  return completedOrder;
};

const getOrder = async (tableNumber) => {
  const order = await Order.findOne({ tableNumber, status: "active" });
  return order;
};

const getOrdersByTable = async (tableNumber) => {
  const orders = await Order.find({ tableNumber }).sort({ createdAt: -1 });
  return orders;
};
const getOrdersByUserId = async (UserId) => {
  const orders = await Order.find({ UserId }).sort({ createdAt: -1 });
  return orders;
};
const getCartByUserId = async (UserId) => {
  const cart = await Order.findOne({ UserId, status: "active" });
  return cart;
};

module.exports = {
  saveOrder,
  completeOrder,
  getOrder,
  getOrdersByTable,
  getOrdersByUserId,
  getCartByUserId,
};
