import express from "express";
import authRoutes from "./routes/auth.routes.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { saveOrder, completeOrder, getOrder } from "./controllers/order.js";
import { saveFeedback, getFeedback } from "./controllers/feedback.js";
import connectMongoDB from "./db/connectMongoDB.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.use(cors());

app.post("/foodData", async (req,res) => {
try{
    res.send(global.foodItems);

}
catch(error){
    console.log(error);
    res.send("Server error");

}
})

app.post("/api/order", async (req, res) => {
    const { tableNumber, orderDetails } = req.body;
  
    try {
      const order = await saveOrder(tableNumber, orderDetails);
      res.status(200).json(order);
    } catch (error) {
      console.error("Error saving order:", error);
      res.status(500).json({ error: "Failed to save order" });
    }
  });
  
  app.post("/api/order/complete", async (req, res) => {
    const { tableNumber } = req.body;
  
    try {
      const order = await completeOrder(tableNumber);
      res.status(200).json(order);
    } catch (error) {
      console.error("Error completing order:", error);
      res.status(500).json({ error: "Failed to complete order" });
    }
  });
  
  app.get("/api/order/:tableNumber", async (req, res) => {
    const { tableNumber } = req.params;
  
    try {
      const order = await getOrder(tableNumber);
      res.status(200).json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });
  app.get("/api/orders/:tableNumber", async (req, res) => {
    const { tableNumber } = req.params;
  
    try {
      const orders = await getOrdersByTable(tableNumber);
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });
  // Feedback routes
  app.post("/api/feedback", async (req, res) => {
    const { customerName, tableNumber, feedbackText, rating } = req.body;
  
    try {
      const feedback = await saveFeedback(
        customerName,
        tableNumber,
        feedbackText,
        rating
      );
      res.status(200).json(feedback);
    } catch (error) {
      console.error("Error saving feedback:", error);
      res.status(500).json({ error: "Failed to save feedback" });
    }
  });
  
  app.get("/api/feedback/:tableNumber", async (req, res) => {
    const { tableNumber } = req.params;
  
    try {
      const feedbacks = await getFeedback(tableNumber);
      res.status(200).json(feedbacks);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      res.status(500).json({ error: "Failed to fetch feedback" });
    }
  });


app.get("/", (req,res) => {
    res.send("server is ready");
})

app.use("/api/auth", authRoutes);

app.get("/test",  async (req,res) =>{
    
})

app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
    connectMongoDB();

});