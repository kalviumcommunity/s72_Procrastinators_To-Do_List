require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for frontend communication

// Debugging MongoDB URI (Remove in production)
if (!process.env.MONGO_URI) {
  console.error("❌ Missing MONGO_URI in environment variables!");
  process.exit(1);
} else {
  console.log("🔗 MongoDB URI loaded.");
}

// Import routes
const taskRoutes = require("./routes");
app.use("/api", taskRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((err) => console.error("❌ Database connection error:", err));

// Root Route
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Welcome to ASAP Project!",
    database_status:
      mongoose.connection.readyState === 1 ? "Connected" : "Not Connected",
  });
});

// Health Check Route
app.get("/ping", (req, res) => {
  res.send("Pong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`🎯 Server running on http://localhost:${PORT}`);
});
