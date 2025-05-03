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
    priority: { type: String },
    originalDeadline: { type: Date },
    currentDeadline: { type: Date },
    postponedCount: { type: Number, default: 0 },
    excuse: { type: String },
    inGraveyard: { type: Boolean, default: false },
    lastPostponedAt: { type: Date },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

// ✅ API Routes

// 👉 Fetch all tasks
app.get(
  "/api/tasks",
  asyncHandler(async (req, res) => {
    // Get tasks that are not in the graveyard by default
    const tasks = await Task.find({ inGraveyard: { $ne: true } }).sort({
      createdAt: -1,
    }); // Latest tasks first
    res.status(200).json(tasks);
  })
);

// 👉 Add a new task
app.post(
  "/api/tasks",
  asyncHandler(async (req, res) => {
    const { title, description, priority, deadline } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Task title is required" });
    }

    // Create a new task with deadline if provided
    const taskData = {
      title,
      description,
      priority,
      originalDeadline: deadline || null,
      currentDeadline: deadline || null,
    };

    const newTask = await Task.create(taskData);
    res
      .status(201)
      .json({ message: "✅ Task added successfully!", task: newTask });
  })
);

// 👉 Update an existing task (Editing)
app.put(
  "/api/tasks/:id",
  asyncHandler(async (req, res) => {
    const { title, description, priority, deadline } = req.body;

    const updateData = { title, description, priority };

    // Only update deadlines if they're provided
    if (deadline) {
      // If the original deadline doesn't exist yet, set it
      const task = await Task.findById(req.params.id);
      if (!task.originalDeadline) {
        updateData.originalDeadline = deadline;
      }
      updateData.currentDeadline = deadline;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "✅ Task updated successfully!", task: updatedTask });
  })
);

// 👉 Toggle task completion
app.patch(
  "/api/tasks/:id/toggle",
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.completed = !task.completed; // Toggle completion status
    await task.save();
    res.status(200).json({ message: "✅ Task status toggled!", task });
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

// 👉 Procrastinate (Postpone) a task
app.post(
  "/api/tasks/:id/procrastinate",
  asyncHandler(async (req, res) => {
    const { excuse, daysToPostpone } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Increase postponed count
    task.postponedCount += 1;

    // Update the excuse if provided
    if (excuse) {
      task.excuse = excuse;
    }

    // Update deadline if exists
    if (task.currentDeadline) {
      const currentDate = new Date(task.currentDeadline);
      currentDate.setDate(currentDate.getDate() + (daysToPostpone || 1));
      task.currentDeadline = currentDate;
    }

    // Record when it was postponed
    task.lastPostponedAt = new Date();

    // If postponed more than 5 times, move to task graveyard
    if (task.postponedCount >= 5) {
      task.inGraveyard = true;
    }

    await task.save();

    res.status(200).json({
      message: "🛌 Task successfully procrastinated!",
      task,
    });
  })
);

// 👉 Get tasks from the graveyard
app.get(
  "/api/tasks/graveyard",
  asyncHandler(async (req, res) => {
    const graveyardTasks = await Task.find({ inGraveyard: true }).sort({
      lastPostponedAt: -1,
    });

    res.status(200).json(graveyardTasks);
  })
);

// 👉 Get procrastination statistics
app.get(
  "/api/stats",
  asyncHandler(async (req, res) => {
    // Count total tasks
    const totalTasks = await Task.countDocuments();

    // Count completed tasks
    const completedTasks = await Task.countDocuments({ completed: true });

    // Count tasks in graveyard
    const graveyardTasks = await Task.countDocuments({ inGraveyard: true });

    // Get total postponements
    const tasks = await Task.find();
    const totalPostponements = tasks.reduce(
      (sum, task) => sum + task.postponedCount,
      0
    );

    // Get most postponed task
    const mostPostponedTask = await Task.findOne().sort({ postponedCount: -1 });

    // Get tasks postponed in the last week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const recentlyPostponed = await Task.countDocuments({
      lastPostponedAt: { $gte: oneWeekAgo },
    });

    res.status(200).json({
      totalTasks,
      completedTasks,
      graveyardTasks,
      totalPostponements,
      completionRate:
        totalTasks > 0
          ? ((completedTasks / totalTasks) * 100).toFixed(2) + "%"
          : "0%",
      procrastinationRate:
        totalTasks > 0 ? (totalPostponements / totalTasks).toFixed(2) : 0,
      mostPostponedTask: mostPostponedTask
        ? {
            title: mostPostponedTask.title,
            postponedCount: mostPostponedTask.postponedCount,
          }
        : null,
      recentlyPostponed,
    });
  })
);

// ✅ Root Route
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Welcome to the Procrastinator's To-Do List API!",
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
