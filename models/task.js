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

    // Task deadline tracking
    originalDeadline: { type: Date }, // Original due date
    currentDeadline: { type: Date }, // Current due date after postponements

    // Procrastination tracking
    postponedCount: { type: Number, default: 0 }, // Number of times postponed
    inGraveyard: { type: Boolean, default: false }, // Whether task is in the graveyard

    // 🎭 Procrastination excuse field
    excuse: {
      type: String,
      default: "I'll start after just one more episode... 🍿",
    },

    // Track when the task was last postponed
    lastPostponedAt: { type: Date },

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
