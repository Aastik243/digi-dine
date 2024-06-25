import Feedback from "../models/Feedback.js";
import connectMongoDB from "../db/connectMongoDB.js";

// Ensure database connection
connectMongoDB();

export const saveFeedback = async (
  customerName,
  tableNumber,
  feedbackText,
  rating
) => {
  const newFeedback = new Feedback({
    customerName,
    tableNumber,
    feedbackText,
    rating,
  });
  const savedFeedback = await newFeedback.save();
  return savedFeedback;
};

export const getFeedback = async (tableNumber) => {
  const feedbacks = await Feedback.find({ tableNumber });
  return feedbacks;
};

