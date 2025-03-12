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
    res.status(201).json(newTask);
  })
);

// Get all tasks
router.get(
  "/tasks",
  asyncHandler(async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  })
);

// Get a specific task by ID
router.get(
  "/tasks/:id",
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  })
);

// Update a task by ID
router.put(
  "/tasks/:id",
  asyncHandler(async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updatedTask);
  })
);

// Delete a task by ID
router.delete(
  "/tasks/:id",
  asyncHandler(async (req, res) => {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  })
);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error("❌ Route Error:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

module.exports = router;
