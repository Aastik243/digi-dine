import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectMongoDB = async (req,res) => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb connected : ${conn.connection.host}`);

    }
    catch (error) {
        console.error(`Error connection to MongoDB : ${error.message}`) ;
        process.exit(1);

    }
}

export default connectMongoDB;