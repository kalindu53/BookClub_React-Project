import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";


import readerRoutes from "./routes/reader";
import bookRoutes from "./routes/book";
import lendRoutes from "./routes/lend";
import authRoutes from "./routes/auth";


// Config .env
dotenv.config();

// App
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get("/", (req: Request, res: Response) => {
  res.send("📚 Book Club Library Backend is Running!");
});

// DB connection
mongoose
  .connect(process.env.MONGO_URI || "", {
    dbName: "bookclub",
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Error", err);
  });


  app.use("/api/readers", readerRoutes);
  app.use("/api/books", bookRoutes);

  
  app.use("/api/lend", lendRoutes);

  app.use("/api/auth", authRoutes);
