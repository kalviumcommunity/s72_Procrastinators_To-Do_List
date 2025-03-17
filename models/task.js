const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 3 }, // Title must be at least 3 chars
    description: { type: String },
    completed: { type: Boolean, default: false, index: true }, // Indexed for performance
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    }, // Task priority

    // 🎭 Fun procrastination excuse field
    excuse: {
      type: String,
      default: "I'll start after just one more episode... 🍿",
    },

    // 💪 Over-the-top motivation message
    motivation: {
      type: String,
      default: "Get up and DO IT! Future You is counting on you! 🚀",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
