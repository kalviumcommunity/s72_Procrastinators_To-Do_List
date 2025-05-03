const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
let dbConnectionStatus = "Not connected";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully!");
    dbConnectionStatus = "Connected";
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    dbConnectionStatus = "Error connecting to database";
  });

// Home route to display database connection status
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Procrastinator's To-Do List API",
    databaseStatus: dbConnectionStatus,
  });
});

// Routes
app.use("/api", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port http://localhost:${PORT}`);
});
