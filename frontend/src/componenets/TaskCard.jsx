import { useState } from "react";
import { procrastinateTask } from "../services/api";
import ExcuseGenerator from "./ExcuseGenerator";

const TaskCard = ({
  task,
  excuse,
  motivation,
  onUpdateStatus,
  onTaskChange,
}) => {
  const [isPostponing, setIsPostponing] = useState(false);
  const [selectedExcuse, setSelectedExcuse] = useState("");
  const [daysToPostpone, setDaysToPostpone] = useState(1);

  const handleExcuseSelect = (excuse) => {
    setSelectedExcuse(excuse);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No deadline";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleProcrastinate = async () => {
    setIsPostponing(true);
    try {
      const result = await procrastinateTask(task._id, {
        excuse: selectedExcuse || excuse,
        daysToPostpone,
      });

      if (result && result.task) {
        // Notify parent component that the task has changed
        if (onTaskChange) {
          onTaskChange(result.task);
        }
      }
    } catch (error) {
      console.error("Error postponing task:", error);
    } finally {
      setIsPostponing(false);
      setSelectedExcuse("");
      setDaysToPostpone(1);
    }
  };

  return (
    <div
      style={{
        border: "3px dashed #FFD700", // Golden procrastination theme
        borderRadius: "10px",
        padding: "20px",
        margin: "10px auto",
        maxWidth: "500px",
        textAlign: "left",
        backgroundColor: task.completed ? "#32CD32" : "#222",
        color: "#fff",
        opacity: task.completed ? 0.6 : 1,
        textDecoration: task.completed ? "line-through" : "none",
        transition: "0.3s ease-in-out",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>📝 {task.title}</h2>
        <div
          style={{
            backgroundColor:
              task.priority === "High"
                ? "#ff6b6b"
                : task.priority === "Medium"
                ? "#ffd166"
                : "#06d6a0",
            color: "black",
            padding: "5px 8px",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {task.priority || "Medium"}
        </div>
      </div>

      <p>
        {task.description ||
          "No description provided, probably procrastinating…"}
      </p>

      {/* Deadline information */}
      {task.currentDeadline && (
        <div style={{ marginTop: "10px" }}>
          <p>
            <strong>Deadline:</strong> {formatDate(task.currentDeadline)}
          </p>
          {task.originalDeadline !== task.currentDeadline && (
            <p>
              <strong>Original deadline:</strong>{" "}
              {formatDate(task.originalDeadline)}
            </p>
          )}
        </div>
      )}

      {/* Procrastination info */}
      {task.postponedCount > 0 && (
        <p>
          <strong>Postponed:</strong> {task.postponedCount}{" "}
          {task.postponedCount === 1 ? "time" : "times"}
        </p>
      )}

      <p>
        <strong>Status:</strong>{" "}
        {task.completed ? "✅ Completed (Miracle!)" : "⏳ Meh, later…"}
      </p>

      <p>❌ Excuse: {task.excuse || excuse}</p>
      <p>💪 Motivation: {motivation}</p>

      {/* Task actions */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* Complete button */}
        <button
          onClick={() => onUpdateStatus(task._id, !task.completed)}
          style={{
            padding: "10px",
            fontSize: "14px",
            cursor: "pointer",
            borderRadius: "5px",
            backgroundColor: task.completed ? "#FF4500" : "#00BFFF",
            color: "white",
            border: "none",
          }}
        >
          {task.completed ? "Oops, I'll do it now" : "Eh… Fine, I'll do it"}
        </button>

        {/* Procrastinate button */}
        {!task.completed && (
          <button
            onClick={() => setIsPostponing(!isPostponing)}
            style={{
              padding: "10px",
              fontSize: "14px",
              cursor: "pointer",
              borderRadius: "5px",
              backgroundColor: "#FF6B6B",
              color: "white",
              border: "none",
            }}
            disabled={task.postponedCount >= 5}
          >
            {task.postponedCount >= 5
              ? "Can't Postpone anymore!"
              : "Procrastinate"}
          </button>
        )}
      </div>

      {/* Procrastination panel */}
      {isPostponing && (
        <div
          style={{
            marginTop: "15px",
            padding: "15px",
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "5px",
          }}
        >
          <h3>😴 How long should we postpone?</h3>

          <div style={{ marginBottom: "15px" }}>
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
              style={{ width: "60px", padding: "5px" }}
            />
          </div>

          {/* Excuse generator */}
          <ExcuseGenerator onSelectExcuse={handleExcuseSelect} />

          {selectedExcuse && (
            <p style={{ fontStyle: "italic", marginTop: "10px" }}>
              Selected excuse: "{selectedExcuse}"
            </p>
          )}

          <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
            <button
              onClick={handleProcrastinate}
              disabled={isPostponing}
              style={{
                padding: "10px 15px",
                backgroundColor: "#FF9F1C",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {isPostponing ? "Postponing..." : "Confirm Procrastination"}
            </button>

            <button
              onClick={() => setIsPostponing(false)}
              style={{
                padding: "10px 15px",
                backgroundColor: "#555",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
