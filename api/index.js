import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import subscriptionRoutes from "./routes/subscriptions.js";
import rentalRoutes from "./routes/rentals.js";
import cookieParser from "cookie-parser";
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

// const _dirname = path.dirname("");
// const buildPath = path.join(_dirname, "../client/build");

// middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
    next();
  });
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
    );
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(buildPath));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/temporary-rentals", rentalRoutes);
// console.log(process.env.NODE_ENV)
// Serve static assets if in production
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV !== "production") {

   // Set static folder
  app.use(express.static("../client/build"));

  const __dirname = dirname(fileURLToPath(import.meta.url));
// qntvg4x2UCI2viO3JZec7O7mBiKBAxN5khuTcyv7sQq19f
  app.get("/*", function(req, res) {
    res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (err) {
      if(err) {
        res.status(500).json(err);
      }
    }
    )
  })
}

app.listen(5000, ()=>{
    console.log("App has started at 5000");
    connect()
})