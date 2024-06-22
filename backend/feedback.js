const Feedback = require("./models/Feedback");
const connectDB = require("./db");

// Ensure database connection
connectDB();

const saveFeedback = async (
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

const getFeedback = async (tableNumber) => {
  const feedbacks = await Feedback.find({ tableNumber });
  return feedbacks;
};

module.exports = {
  saveFeedback,
  getFeedback,
};
