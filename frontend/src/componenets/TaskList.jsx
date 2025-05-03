import { useEffect, useState } from "react";
import {
  fetchTasks,
  updateTask,
  updateTaskStatus,
  deleteTask,
  procrastinateTask,
} from "../services/api";
import ExcuseGenerator from "./ExcuseGenerator";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedPriority, setUpdatedPriority] = useState("Medium");
  const [updatedDeadline, setUpdatedDeadline] = useState("");
  const [updating, setUpdating] = useState(false);
  const [isPostponing, setIsPostponing] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedExcuse, setSelectedExcuse] = useState("");
  const [daysToPostpone, setDaysToPostpone] = useState(1);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch {
        setError("⚠️ Error fetching tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  const handleComplete = async (taskId) => {
    try {
      const response = await updateTaskStatus(taskId, true);
      if (response && response.task) {
        setTasks(
          tasks.map((task) => (task._id === taskId ? response.task : task))
        );
      }
    } catch (error) {
      console.error("❌ Error updating task status:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("❌ Error deleting task:", error);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task._id);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description || "");
    setUpdatedPriority(task.priority || "Medium");
    setUpdatedDeadline(
      task.currentDeadline ? formatDate(task.currentDeadline) : ""
    );
  };

  const handleUpdate = async () => {
    if (!editingTask || updating) return;

    setUpdating(true);
    try {
      const updateData = {
        title: updatedTitle,
        description: updatedDescription,
        priority: updatedPriority,
        deadline: updatedDeadline,
      };

      const response = await updateTask(editingTask, updateData);

      if (response && response.task) {
        setTasks(
          tasks.map((task) => (task._id === editingTask ? response.task : task))
        );

        setEditingTask(null);
        setUpdatedTitle("");
        setUpdatedDescription("");
        setUpdatedPriority("Medium");
        setUpdatedDeadline("");
      }
    } catch (error) {
      console.error("❌ Error updating task:", error);
      alert("⚠️ Failed to update task. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const startPostponing = (taskId) => {
    setSelectedTaskId(taskId);
    setIsPostponing(true);
  };

  const handleExcuseSelect = (excuse) => {
    setSelectedExcuse(excuse);
  };

  const handleProcrastinate = async () => {
    if (!selectedTaskId) return;

    try {
      const result = await procrastinateTask(selectedTaskId, {
        excuse: selectedExcuse,
        daysToPostpone,
      });

      if (result && result.task) {
        // If task moved to graveyard, remove it
        if (result.task.inGraveyard) {
          setTasks(tasks.filter((task) => task._id !== selectedTaskId));
        } else {
          // Otherwise update it in the list
          setTasks(
            tasks.map((task) =>
              task._id === selectedTaskId ? result.task : task
            )
          );
        }
      }

      // Reset the procrastination panel
      setIsPostponing(false);
      setSelectedTaskId(null);
      setSelectedExcuse("");
      setDaysToPostpone(1);
    } catch (error) {
      console.error("❌ Error procrastinating task:", error);
    }
  };

  if (loading) return <p>⏳ Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>📌 Procrastinator's Tasks</h2>
      {tasks.length === 0 ? (
        <p>🎉 No tasks yet! Add some to get started.</p>
      ) : null}

      {/* Procrastination Panel */}
      {isPostponing && selectedTaskId && (
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            backgroundColor: "#333",
            borderRadius: "8px",
          }}
        >
          <h3>😴 How long should we postpone?</h3>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="days" style={{ marginRight: "10px" }}>
              Days to postpone:
            </label>
            <input
              id="days"
              type="number"
              min="1"
              max="14"
              value={daysToPostpone}
              onChange={(e) => setDaysToPostpone(parseInt(e.target.value) || 1)}
              style={{ padding: "5px", width: "60px" }}
            />
          </div>

          <ExcuseGenerator onSelectExcuse={handleExcuseSelect} />

          {selectedExcuse && (
            <p style={{ fontStyle: "italic", marginTop: "10px" }}>
              Selected excuse: "{selectedExcuse}"
            </p>
          )}

          <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
            <button
              onClick={handleProcrastinate}
              style={{
                padding: "8px 12px",
                backgroundColor: "#FF9F1C",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Confirm Procrastination
            </button>

            <button
              onClick={() => {
                setIsPostponing(false);
                setSelectedTaskId(null);
              }}
              style={{
                padding: "8px 12px",
                backgroundColor: "#666",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "15px 0",
            borderRadius: "8px",
            backgroundColor: task.completed ? "rgba(50, 205, 50, 0.1)" : "#333",
          }}
        >
          {editingTask === task._id ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                required
                style={{ padding: "8px", fontSize: "16px", width: "100%" }}
                placeholder="Task title"
              />

              <textarea
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                rows="3"
                style={{ padding: "8px", fontSize: "16px", width: "100%" }}
                placeholder="Task description"
              />

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <div style={{ flex: "1", minWidth: "150px" }}>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Priority:
                  </label>
                  <select
                    value={updatedPriority}
                    onChange={(e) => setUpdatedPriority(e.target.value)}
                    style={{ padding: "8px", width: "100%" }}
                  >
                    <option value="Low">Low 🟢</option>
                    <option value="Medium">Medium 🟡</option>
                    <option value="High">High 🔥</option>
                  </select>
                </div>

                <div style={{ flex: "1", minWidth: "150px" }}>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Deadline:
                  </label>
                  <input
                    type="date"
                    value={updatedDeadline}
                    onChange={(e) => setUpdatedDeadline(e.target.value)}
                    style={{ padding: "8px", width: "100%" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  onClick={handleUpdate}
                  disabled={updating}
                  style={{
                    padding: "8px 15px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {updating ? "Updating..." : "💾 Save"}
                </button>

                <button
                  onClick={() => setEditingTask(null)}
                  style={{
                    padding: "8px 15px",
                    backgroundColor: "#666",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0" }}>{task.title}</h3>

                <div
                  style={{
                    backgroundColor:
                      task.priority === "High"
                        ? "#ff6b6b"
                        : task.priority === "Medium"
                        ? "#ffd166"
                        : "#06d6a0",
                    color: "black",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {task.priority || "Medium"}
                </div>
              </div>

              <p style={{ margin: "5px 0" }}>{task.description}</p>

              {/* Deadline information */}
              {task.currentDeadline && (
                <p style={{ margin: "5px 0", fontSize: "14px" }}>
                  <strong>Deadline:</strong>{" "}
                  {new Date(task.currentDeadline).toLocaleDateString()}
                  {task.originalDeadline !== task.currentDeadline &&
                    ` (Originally: ${new Date(
                      task.originalDeadline
                    ).toLocaleDateString()})`}
                </p>
              )}

              {/* Procrastination count */}
              {task.postponedCount > 0 && (
                <p style={{ margin: "5px 0", fontSize: "14px" }}>
                  <strong>Postponed:</strong> {task.postponedCount}{" "}
                  {task.postponedCount === 1 ? "time" : "times"}
                </p>
              )}

              {/* Excuse if available */}
              {task.excuse && (
                <p
                  style={{
                    margin: "5px 0",
                    fontSize: "14px",
                    fontStyle: "italic",
                  }}
                >
                  <strong>Excuse:</strong> {task.excuse}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => handleComplete(task._id)}
                  disabled={task.completed}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: task.completed ? "#555" : "#00BFFF",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: task.completed ? "not-allowed" : "pointer",
                    opacity: task.completed ? 0.7 : 1,
                  }}
                >
                  ✅ {task.completed ? "Completed" : "Mark as Done"}
                </button>

                <button
                  onClick={() => startEditing(task)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#FFD700",
                    color: "black",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  ✏️ Edit
                </button>

                {!task.completed && (
                  <button
                    onClick={() => startPostponing(task._id)}
                    disabled={task.postponedCount >= 5}
                    style={{
                      padding: "8px 12px",
                      backgroundColor:
                        task.postponedCount >= 5 ? "#555" : "#FF6B6B",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor:
                        task.postponedCount >= 5 ? "not-allowed" : "pointer",
                      opacity: task.postponedCount >= 5 ? 0.7 : 1,
                    }}
                  >
                    ⏳ Procrastinate
                  </button>
                )}

                <button
                  onClick={() => handleDelete(task._id)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
