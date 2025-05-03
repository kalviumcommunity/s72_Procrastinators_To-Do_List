import React, { useState } from "react";

// Mock data for initial abandoned tasks
const initialAbandonedTasks = [
  {
    id: 1,
    title: "Clean the refrigerator",
    originalDueDate: "2023-01-15",
    abandonedDate: "2023-05-28",
    excuseUsed:
      "The bacteria have formed their own civilization. It would be cruel to destroy it now.",
  },
  {
    id: 2,
    title: "File taxes from 2021",
    originalDueDate: "2022-04-15",
    abandonedDate: "2023-04-14",
    excuseUsed: "Time is just a social construct anyway.",
  },
  {
    id: 3,
    title: "Learn to play guitar",
    originalDueDate: "2020-06-01",
    abandonedDate: "2023-02-10",
    excuseUsed: "My musical genius is best left dormant for humanity's sake.",
  },
  {
    id: 4,
    title: "Organize digital photos",
    originalDueDate: "2022-09-30",
    abandonedDate: "2023-01-20",
    excuseUsed: "I'm preserving the authentic chaos of my memories.",
  },
  {
    id: 5,
    title: "Start a workout routine",
    originalDueDate: "2023-01-01",
    abandonedDate: "2023-01-03",
    excuseUsed: "My body has evolved beyond the need for exercise.",
  },
];

// Epitaphs for random selection
const epitaphs = [
  "Here lies a task, forever undone, free from the burden of completion.",
  "Never started, never finished, perfectly balanced.",
  "Once important, now peacefully forgotten.",
  "Rest in perpetual procrastination.",
  "Time ran out, motivation never arrived.",
  "Too ambitious for this mortal realm.",
  "Not worth the effort, now eternally at peace.",
  "Abandoned with honor, never to be resurrected.",
  "Dreams too big, motivation too small.",
  "Deadline came, deadline went, task remained untouched.",
];

function TaskGraveyard() {
  const [abandonedTasks, setAbandonedTasks] = useState(initialAbandonedTasks);
  const [newTask, setNewTask] = useState({
    title: "",
    originalDueDate: "",
    excuseUsed: "",
  });
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isRaining, setIsRaining] = useState(false);

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate how long the task was procrastinated
  const calculateProcrastinationTime = (originalDate, abandonedDate) => {
    const start = new Date(originalDate);
    const end = new Date(abandonedDate);
    const differenceInTime = end - start;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays < 0) return "Time is an illusion";
    if (differenceInDays === 0) return "Abandoned immediately (impressive!)";
    if (differenceInDays < 30) return `${differenceInDays} days of denial`;
    if (differenceInDays < 365)
      return `${Math.floor(
        differenceInDays / 30
      )} months of masterful avoidance`;
    return `${Math.floor(
      differenceInDays / 365
    )} years of legendary procrastination`;
  };

  // Get random epitaph
  const getRandomEpitaph = () => {
    return epitaphs[Math.floor(Math.random() * epitaphs.length)];
  };

  // Handle adding a new abandoned task
  const handleAddTask = () => {
    if (!newTask.title || !newTask.originalDueDate || !newTask.excuseUsed) {
      alert("Please fill all fields. Or don't. Whatever.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    setAbandonedTasks([
      ...abandonedTasks,
      {
        id: abandonedTasks.length + 1,
        title: newTask.title,
        originalDueDate: newTask.originalDueDate,
        abandonedDate: today,
        excuseUsed: newTask.excuseUsed,
      },
    ]);

    setNewTask({
      title: "",
      originalDueDate: "",
      excuseUsed: "",
    });

    setIsAddingTask(false);
  };

  // Toggle atmospheric rain effect
  const toggleRain = () => {
    setIsRaining(!isRaining);
  };

  return (
    <div className={`task-graveyard ${isRaining ? "raining" : ""}`}>
      <div className="graveyard-header">
        <h2>
          <span className="grave-icon">⚰️</span>
          Task Graveyard
          <span className="grave-icon">🪦</span>
        </h2>
        <p className="graveyard-tagline">
          Where abandoned responsibilities come to rest
        </p>
        <div className="atmosphere-controls">
          <button
            className={`atmosphere-button ${isRaining ? "active" : ""}`}
            onClick={toggleRain}
          >
            {isRaining ? "☀️ Clear Skies" : "🌧️ Add Dramatic Rain"}
          </button>
        </div>
      </div>

      {isRaining && (
        <div className="rain-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="raindrop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 1 + 0.5}s`,
                animationDelay: `${Math.random()}s`,
              }}
            ></div>
          ))}
        </div>
      )}

      <div className="graveyard-plots">
        {abandonedTasks.map((task) => (
          <div
            key={task.id}
            className="grave-plot"
            onClick={() => setSelectedTask(task)}
          >
            <div className="tombstone">
              <h3 className="task-title">{task.title}</h3>
              <p className="dates">
                {formatDate(task.originalDueDate)} -{" "}
                {formatDate(task.abandonedDate)}
              </p>
              <p className="epitaph">{getRandomEpitaph()}</p>
            </div>
            <div className="grave-flowers">
              {"🌸 ".repeat(Math.floor(Math.random() * 3) + 1)}
            </div>
          </div>
        ))}
      </div>

      {!isAddingTask ? (
        <button
          className="bury-task-button"
          onClick={() => setIsAddingTask(true)}
        >
          Bury Another Task
        </button>
      ) : (
        <div className="burial-form">
          <h3>Prepare Task for Eternal Rest</h3>
          <div className="form-group">
            <label>Task To Abandon:</label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              placeholder="What responsibility are you escaping?"
            />
          </div>
          <div className="form-group">
            <label>Original Due Date:</label>
            <input
              type="date"
              value={newTask.originalDueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, originalDueDate: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Excuse For Abandonment:</label>
            <textarea
              value={newTask.excuseUsed}
              onChange={(e) =>
                setNewTask({ ...newTask, excuseUsed: e.target.value })
              }
              placeholder="Why are you letting this task rest in peace?"
            />
          </div>
          <div className="burial-buttons">
            <button className="bury-button" onClick={handleAddTask}>
              Bury Forever
            </button>
            <button
              className="cancel-burial"
              onClick={() => setIsAddingTask(false)}
            >
              Not Ready To Let Go
            </button>
          </div>
        </div>
      )}

      {selectedTask && (
        <div className="memorial-modal">
          <div className="memorial-content">
            <span
              className="close-memorial"
              onClick={() => setSelectedTask(null)}
            >
              ×
            </span>
            <h3>In Loving Memory of "{selectedTask.title}"</h3>
            <div className="memorial-details">
              <p className="procrastination-time">
                Procrastinated for:{" "}
                {calculateProcrastinationTime(
                  selectedTask.originalDueDate,
                  selectedTask.abandonedDate
                )}
              </p>
              <div className="excuse-box">
                <h4>Final Excuse:</h4>
                <p>"{selectedTask.excuseUsed}"</p>
              </div>
              <div className="memorial-actions">
                <button className="mourn-button">Pay Respects</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskGraveyard;
