import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

import morgan from "morgan";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const allowedOrigins = [
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is working fine!",
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});

// never use symbols in password while creating database in mongoDB

/* 

Incoming request bodies ko JSON ke form mein automatically parse karna.

Taaki req.body ka use karke tum server pe easily data access kar sako.

*/

/* 

client se aane wale cookies ko parse karne ka kaam karti hai, taaki tum unhe req.cookies ke through easily access kar sako.

*/

// Allowed frontend domains

// API endpoints
