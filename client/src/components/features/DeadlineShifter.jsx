import React, { useState } from "react";

// Initial mock tasks with deadlines
const initialTasks = [
  {
    id: 1,
    title: "Finish project proposal",
    originalDeadline: "2025-04-15",
    currentDeadline: "2025-04-15",
    priority: "high",
    shiftsCount: 0,
    excuseUsed: "",
  },
  {
    id: 2,
    title: "Email client about changes",
    originalDeadline: "2025-04-10",
    currentDeadline: "2025-04-20",
    priority: "medium",
    shiftsCount: 2,
    excuseUsed: "My inbox is currently at capacity",
  },
  {
    id: 3,
    title: "Update portfolio website",
    originalDeadline: "2025-03-30",
    currentDeadline: "2025-05-15",
    priority: "low",
    shiftsCount: 4,
    excuseUsed: "Waiting for creative inspiration",
  },
  {
    id: 4,
    title: "Pay phone bill",
    originalDeadline: "2025-04-05",
    currentDeadline: "2025-04-05",
    priority: "high",
    shiftsCount: 0,
    excuseUsed: "",
  },
];

// Premade excuses
const premadeExcuses = [
  "I need more time to perfect it",
  "Mercury is in retrograde",
  "I'm mentally preparing for this task",
  "My creativity peaks at later dates",
  "I work better under extreme pressure",
  "Need to consult with my emotional support pet first",
  "Waiting for the perfect alignment of motivation and caffeine",
  "The original deadline was clearly unrealistic",
  "Time is a social construct anyway",
  "Focusing on personal growth before taking this on",
];

function DeadlineShifter() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newDeadline, setNewDeadline] = useState("");
  const [excuse, setExcuse] = useState("");
  const [showExcuseSelector, setShowExcuseSelector] = useState(false);
  const [customExcuse, setCustomExcuse] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  // Format date for display (YYYY-MM-DD to Month DD, YYYY)
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate days shifted for display
  const calculateDaysShifted = (original, current) => {
    const originalDate = new Date(original);
    const currentDate = new Date(current);
    const diffTime = currentDate - originalDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Not shifted";
    return `${diffDays} days later`;
  };

  // Handle selecting a task to shift
  const handleSelectTask = (task) => {
    setSelectedTask(task);
    setNewDeadline(task.currentDeadline);
    setExcuse("");
    setCustomExcuse("");
    setShowExcuseSelector(false);
  };

  // Handle shift deadline submission
  const handleShiftDeadline = () => {
    if (!selectedTask || !newDeadline || !excuse) {
      alert("Please fill in all fields to procrastinate properly!");
      return;
    }

    // Calculate if actually postponing
    const isPostponing =
      new Date(newDeadline) > new Date(selectedTask.currentDeadline);

    // Update the task with new deadline
    const updatedTasks = tasks.map((task) => {
      if (task.id === selectedTask.id) {
        return {
          ...task,
          currentDeadline: newDeadline,
          shiftsCount: isPostponing ? task.shiftsCount + 1 : task.shiftsCount,
          excuseUsed: isPostponing ? excuse : task.excuseUsed,
        };
      }
      return task;
    });

    setTasks(updatedTasks);

    // Show confetti animation if postponing
    if (isPostponing) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }

    setSelectedTask(null);
  };

  // Handle selecting a premade excuse
  const handleSelectExcuse = (selectedExcuse) => {
    setExcuse(selectedExcuse);
    setShowExcuseSelector(false);
  };

  // Handle setting custom excuse
  const handleSetCustomExcuse = () => {
    if (customExcuse.trim() === "") {
      alert("Even procrastination needs a reason!");
      return;
    }

    setExcuse(customExcuse);
    setShowExcuseSelector(false);
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div className="deadline-shifter-container">
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
              }}
            ></div>
          ))}
        </div>
      )}

      <div className="deadline-header">
        <h2>
          <span className="deadline-icon">📅</span>
          Strategic Deadline Adjuster
          <span className="deadline-icon">⏰</span>
        </h2>
        <p className="deadline-tagline">
          Because deadlines are more like guidelines anyway
        </p>
      </div>

      <div className="deadline-content">
        <div className="tasks-list">
          <h3>Your Tasks</h3>
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`task-item ${
                selectedTask && selectedTask.id === task.id ? "selected" : ""
              }`}
              onClick={() => handleSelectTask(task)}
            >
              <div className="task-header">
                <span
                  className="priority-indicator"
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                ></span>
                <h4 className="task-title">{task.title}</h4>
              </div>
              <div className="task-deadlines">
                <div className="deadline-info">
                  <span className="deadline-label">Original:</span>
                  <span className="deadline-date">
                    {formatDate(task.originalDeadline)}
                  </span>
                </div>
                <div className="deadline-info current">
                  <span className="deadline-label">Current:</span>
                  <span className="deadline-date">
                    {formatDate(task.currentDeadline)}
                  </span>
                </div>
                {task.shiftsCount > 0 && (
                  <div className="shift-count">
                    <span>Shifted {task.shiftsCount} times</span>
                    <span className="days-shifted">
                      {calculateDaysShifted(
                        task.originalDeadline,
                        task.currentDeadline
                      )}
                    </span>
                  </div>
                )}
              </div>
              {task.excuseUsed && (
                <div className="task-excuse">
                  <span className="excuse-label">Last excuse:</span>
                  <span className="excuse-text">"{task.excuseUsed}"</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedTask && (
          <div className="shift-form">
            <h3>Adjust Deadline for "{selectedTask.title}"</h3>
            <div className="form-group">
              <label>
                Current Deadline: {formatDate(selectedTask.currentDeadline)}
              </label>
            </div>
            <div className="form-group">
              <label>New Deadline:</label>
              <input
                type="date"
                value={newDeadline}
                min={selectedTask.originalDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Excuse for Adjustment:</label>
              {!showExcuseSelector ? (
                <div className="excuse-input">
                  <input
                    type="text"
                    readOnly
                    value={excuse}
                    placeholder="Select an excuse..."
                    onClick={() => setShowExcuseSelector(true)}
                  />
                  <button
                    className="excuse-button"
                    onClick={() => setShowExcuseSelector(true)}
                  >
                    Find Excuse
                  </button>
                </div>
              ) : (
                <div className="excuse-selector">
                  <div className="premade-excuses">
                    <h4>Our Curated Excuses:</h4>
                    <div className="excuse-options">
                      {premadeExcuses.map((excuse, index) => (
                        <div
                          key={index}
                          className="excuse-option"
                          onClick={() => handleSelectExcuse(excuse)}
                        >
                          {excuse}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="custom-excuse">
                    <h4>Or Create Your Own:</h4>
                    <textarea
                      value={customExcuse}
                      onChange={(e) => setCustomExcuse(e.target.value)}
                      placeholder="Why do you 'need' more time?"
                    />
                    <div className="excuse-actions">
                      <button
                        className="use-custom-button"
                        onClick={handleSetCustomExcuse}
                      >
                        Use This Excuse
                      </button>
                      <button
                        className="cancel-button"
                        onClick={() => setShowExcuseSelector(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="form-actions">
              <button
                className="shift-button"
                onClick={handleShiftDeadline}
                disabled={!newDeadline || !excuse}
              >
                Shift Deadline
              </button>
              <button
                className="cancel-shift"
                onClick={() => setSelectedTask(null)}
              >
                Nevermind
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="deadline-footer">
        <div className="stats">
          <div className="stat">
            <span className="stat-value">
              {tasks.reduce((sum, task) => sum + task.shiftsCount, 0)}
            </span>
            <span className="stat-label">Total Shifts</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {
                tasks.filter(
                  (task) =>
                    new Date(task.currentDeadline) >
                    new Date(task.originalDeadline)
                ).length
              }
            </span>
            <span className="stat-label">Tasks Postponed</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {tasks.filter((task) => task.shiftsCount === 0).length}
            </span>
            <span className="stat-label">Unshifted Tasks</span>
          </div>
        </div>
        <div className="deadline-motto">
          "Why do today what you can reschedule for tomorrow?"
        </div>
      </div>
    </div>
  );
}

export default DeadlineShifter;
