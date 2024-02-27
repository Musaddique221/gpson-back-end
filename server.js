import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { getProductById, getProducts } from "./routes/ProductRoutes.js";

import connectDB from "./config/db.js";
import { loginUser, registerUser } from "./routes/UserRoute.js";
import { addOrderItems, deleteOrder, getMyOrders } from "./routes/OrderRoutes.js";
import { protect } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

console.log(process.env.BASE_URL);

connectDB();

app.get("/", getProducts);
app.get("/product/:id", getProductById);
app.post("/login", loginUser);
app.post("/register", registerUser);
app.post("/order", addOrderItems);
app.get("/cart/:id", getMyOrders);
app.delete("/cart/:id", deleteOrder);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
