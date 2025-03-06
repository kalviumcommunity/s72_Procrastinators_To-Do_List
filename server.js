require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging line

const taskRoutes = require("./routes");
app.use(express.json());
app.use("/api", taskRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("❌ Database connection error:", err);
});

db.once("open", () => {
  console.log("✅ Connected to MongoDB successfully");
});

app.get("/", (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
  res.json({ message: "Welcome to ASAP Project!", database_status: dbStatus });
});

// /ping route
app.get("/ping", (req, res) => {
  res.send("Pong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
