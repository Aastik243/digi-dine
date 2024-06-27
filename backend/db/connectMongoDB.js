import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectMongoDB = async (req, res) => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log(`MongoDB connected: ${conn.connection.host}`);
  
      const db = mongoose.connection;
  
      // Ensure operations are performed after the connection is open
      db.once('open', async () => {
        console.log('Successfully connected to the database.');
  
        try {
          
          // Fetch data from the "foodItems" collection
          const fetched_data = db.collection("foodItems");
          const data = await fetched_data.find({}).toArray();
  
          global.foodItems = data;
         // console.log(global.foodItems);
  
          // Optionally respond with the fetched data if this is an API endpoint
          if (res) {
            return res.status(200).json({ message: "Data fetched successfully"});
          }
        } catch (err) {
          console.error('Error fetching collections or data:', err);
          if (res) {
            return res.status(500).json({ message: 'Error fetching collections or data', error: err.message });
          }
        }
      });
    } catch (error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
      if (res) {
        return res.status(500).json({ message: `Error connecting to MongoDB: ${error.message}` });
      }
    }
  };

export default connectMongoDB;