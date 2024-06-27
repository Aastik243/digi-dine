import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  orderDetails: {
    type: Array,
    required: true,
    default: [],
  },
  date : {
    type: String,
    required:true,
  }

});

const Order = mongoose.model("Order", orderSchema);

export default Order;