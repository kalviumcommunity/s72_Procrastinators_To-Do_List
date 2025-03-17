require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const asyncHandler = require("express-async-handler");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Allow frontend access
    credentials: true,
  })
);

// ✅ MongoDB Connection
if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is missing in environment variables!");
  process.exit(1);
} else {
  console.log("🔗 MongoDB URI loaded successfully.");
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  });

// ✅ Task Schema & Model
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

// ✅ API Routes

// 👉 Fetch all tasks (for listing in frontend)
app.get(
  "/api/tasks",
  asyncHandler(async (req, res) => {
    const tasks = await Task.find().sort({ createdAt: -1 }); // Latest tasks first
    res.status(200).json(tasks);
  })
);

// 👉 Add a new task (Form submission)
app.post(
  "/api/tasks",
  asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Task title is required" });
    }

    const newTask = await Task.create({ title, description });
    res
      .status(201)
      .json({ message: "✅ Task added successfully!", task: newTask });
  })
);

// 👉 Toggle task completion
app.put(
  "/api/tasks/:id",
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.completed = !task.completed; // Toggle completion status
    await task.save();
    res.status(200).json({ message: "✅ Task updated!", task });
  })
);

// 👉 Delete a task
app.delete(
  "/api/tasks/:id",
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "🗑️ Task deleted successfully!" });
  })
);

// ✅ Root Route
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Welcome to the Procrastinator’s To-Do List API!",
    database_status:
      mongoose.connection.readyState === 1 ? "Connected" : "Not Connected",
  });
});

// ✅ Health Check Route
app.get("/ping", (req, res) => {
  res.send("Pong! ✅ Server is running.");
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start the Server
app.listen(PORT, () => {
  console.log(`🎯 Server is running at: http://localhost:${PORT}`);
});
