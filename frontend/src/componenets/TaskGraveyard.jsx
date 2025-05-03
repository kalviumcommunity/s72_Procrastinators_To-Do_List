import { useState, useEffect } from "react";
import { fetchGraveyardTasks, deleteTask } from "../services/api";

const TaskGraveyard = () => {
  const [graveyardTasks, setGraveyardTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGraveyardTasks = async () => {
      try {
        setLoading(true);
        const fetchedTasks = await fetchGraveyardTasks();
        setGraveyardTasks(fetchedTasks);
      } catch {
        setError("⚠️ Error fetching graveyard tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadGraveyardTasks();
  }, []);

  const handleDeleteForever = async (taskId) => {
    try {
      await deleteTask(taskId);
      setGraveyardTasks(graveyardTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task permanently:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) return <p>⏳ Digging up the graveyard...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="task-graveyard">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2>💀 Task Graveyard 🪦</h2>
        <p>Here lie the tasks that were procrastinated into oblivion.</p>
      </div>

      {graveyardTasks.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "30px",
            backgroundColor: "#333",
            borderRadius: "10px",
            margin: "20px 0",
          }}
        >
          <p>
            The graveyard is empty. You haven't procrastinated enough... yet.
          </p>
        </div>
      ) : (
        <div className="graveyard-tasks">
          {graveyardTasks.map((task) => (
            <div
              key={task._id}
              style={{
                backgroundColor: "#333",
                border: "2px solid #555",
                borderRadius: "8px",
                padding: "15px",
                margin: "15px 0",
                position: "relative",
                opacity: 0.7,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "15px",
                  fontSize: "20px",
                }}
              >
                🪦
              </div>

              <h3
                style={{
                  textDecoration: "line-through",
                  color: "#aaa",
                }}
              >
                {task.title}
              </h3>

              <p style={{ fontSize: "14px", color: "#aaa" }}>
                {task.description || "No description provided"}
              </p>

              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  color: "#999",
                }}
              >
                <div>
                  <p>
                    <strong>Priority:</strong> {task.priority || "Medium"}
                  </p>
                  <p>
                    <strong>Postponed:</strong> {task.postponedCount} times
                  </p>
                  <p>
                    <strong>Created:</strong> {formatDate(task.createdAt)}
                  </p>
                  <p>
                    <strong>Last postponed:</strong>{" "}
                    {formatDate(task.lastPostponedAt)}
                  </p>
                </div>

                <div>
                  <p>
                    <strong>Excuse:</strong>{" "}
                    {task.excuse || "No excuse provided"}
                  </p>
                  {task.originalDeadline && (
                    <p>
                      <strong>Original Deadline:</strong>{" "}
                      {formatDate(task.originalDeadline)}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleDeleteForever(task._id)}
                style={{
                  backgroundColor: "#aa3333",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  marginTop: "15px",
                  cursor: "pointer",
                }}
              >
                Delete Forever
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskGraveyard;
