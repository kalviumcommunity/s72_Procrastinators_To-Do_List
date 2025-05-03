const express = require("express");
const router = express.Router();
const Task = require("./models/task"); // Ensure correct model import

// Middleware for error handling
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Create a new task
router.post(
  "/tasks",
  asyncHandler(async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json({
      success: true,
      data: newTask,
      message: "Task created successfully",
    });
  })
);

// Get all tasks with filtering options
router.get(
  "/tasks",
  asyncHandler(async (req, res) => {
    const { completed, priority, inGraveyard } = req.query;

    // Build filter object based on query parameters
    const filter = {};
    if (completed !== undefined) filter.completed = completed === "true";
    if (priority) filter.priority = priority;
    if (inGraveyard !== undefined) filter.inGraveyard = inGraveyard === "true";

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  })
);

// Get tasks in graveyard - IMPORTANT: This route must come BEFORE /tasks/:id to avoid conflicts
router.get(
  "/tasks/graveyard",
  asyncHandler(async (req, res) => {
    const graveyardTasks = await Task.find({ inGraveyard: true });

    res.status(200).json({
      success: true,
      count: graveyardTasks.length,
      data: graveyardTasks,
    });
  })
);

// Get a specific task by ID
router.get(
  "/tasks/:id",
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    res.status(200).json({
      success: true,
      data: task,
    });
  })
);

// Update a task by ID
router.put(
  "/tasks/:id",
  asyncHandler(async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    res.status(200).json({
      success: true,
      data: updatedTask,
      message: "Task updated successfully",
    });
  })
);

// Delete a task by ID
router.delete(
  "/tasks/:id",
  asyncHandler(async (req, res) => {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  })
);

// Postpone a task (increment postponedCount and update currentDeadline)
router.patch(
  "/tasks/:id/postpone",
  asyncHandler(async (req, res) => {
    const { newDeadline } = req.body;

    if (!newDeadline) {
      return res.status(400).json({
        success: false,
        message: "New deadline is required",
      });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Update task with new postponement data
    task.postponedCount += 1;
    task.lastPostponedAt = new Date();
    task.currentDeadline = new Date(newDeadline);

    if (task.postponedCount >= 3) {
      task.inGraveyard = true;
    }

    await task.save();

    res.status(200).json({
      success: true,
      data: task,
      message: "Task postponed successfully",
    });
  })
);

// Mark task as completed/uncompleted
router.patch(
  "/tasks/:id/toggle-complete",
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.completed = !task.completed;
    await task.save();

    res.status(200).json({
      success: true,
      data: task,
      message: `Task marked as ${task.completed ? "completed" : "incomplete"}`,
    });
  })
);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error("❌ Route Error:", err);
  res.status(500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

module.exports = router;
