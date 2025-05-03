import { useState, useEffect } from "react";
import { updateTask, fetchTasks } from "../services/api";

const UpdateTask = ({ taskId, onClose, onTaskUpdated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        // Get all tasks and find the task with the matching ID
        const tasks = await fetchTasks();
        const task = tasks.find((t) => t._id === taskId);

        if (task) {
          setTitle(task.title);
          setDescription(task.description || "");
          setPriority(task.priority || "Medium");

          // Format date for the input field if it exists
          if (task.currentDeadline) {
            const date = new Date(task.currentDeadline);
            setDeadline(date.toISOString().split("T")[0]);
          }
        } else {
          setError("⚠️ Task not found.");
        }
        setLoading(false);
      } catch {
        setError("⚠️ Error fetching task. Please try again.");
        setLoading(false);
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const response = await updateTask(taskId, {
        title,
        description,
        priority,
        deadline,
      });

      if (response && response.task) {
        if (onTaskUpdated) {
          onTaskUpdated(response.task);
        }

        if (onClose) {
          onClose();
        }
      }
    } catch (error) {
      console.error("❌ Error updating task:", error);
      setError("⚠️ Failed to update task. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>⏳ Loading task details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#333",
        borderRadius: "10px",
        margin: "15px 0",
      }}
    >
      <h2 style={{ marginTop: 0 }}>✏️ Update Task</h2>
      <form
        onSubmit={handleUpdate}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #555",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #555",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <div style={{ flex: "1", minWidth: "200px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Priority:
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{
                padding: "10px",
                fontSize: "16px",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid #555",
              }}
            >
              <option value="Low">Low 🟢</option>
              <option value="Medium">Medium 🟡</option>
              <option value="High">High 🔥</option>
            </select>
          </div>

          <div style={{ flex: "1", minWidth: "200px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Deadline (Optional):
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              style={{
                padding: "10px",
                fontSize: "16px",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid #555",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button
            type="submit"
            disabled={updating}
            style={{
              padding: "12px 20px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: updating ? "not-allowed" : "pointer",
            }}
          >
            {updating ? "Updating..." : "Update Task"}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "12px 20px",
                fontSize: "16px",
                backgroundColor: "#666",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
