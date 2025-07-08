import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());

/* 

Incoming request bodies ko JSON ke form mein automatically parse karna.

Taaki req.body ka use karke tum server pe easily data access kar sako.

*/

app.use(cookieParser());

/* 

client se aane wale cookies ko parse karne ka kaam karti hai, taaki tum unhe req.cookies ke through easily access kar sako.

*/

const allowedOrigins = [
  "http://localhost:5173",
  "https://abesec-memories.vercel.app",
];

app.use(cors({ origin: allowedOrigins, credentials: true })); // so that we can send cookies in response

// API endpoints
app.get("/", (req, res) => {
  res.send("API is working fine");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});

// never use symbols in password while creating database in mongoDB
