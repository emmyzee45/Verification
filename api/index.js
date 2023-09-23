import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import subscriptionRoutes from "./routes/subscriptions.js";
import rentalRoutes from "./routes/rentals.js";
const app = express();
dotenv.config();

const connect = () => {
    mongoose.connect(process.env.Mongo)
    .then(()=>{
        console.log("MongoDB connected!")
    })
    .catch((err) => {
        throw err
    })
}

// middlewares
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
// app.use("/api/account", userRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/temporary-rentals", rentalRoutes);


app.listen(3000, ()=>{
    console.log("App has started at 3000");
    connect()
})