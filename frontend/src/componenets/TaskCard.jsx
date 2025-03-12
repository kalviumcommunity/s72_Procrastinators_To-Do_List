const TaskCard = ({ task, excuse, motivation, onUpdateStatus }) => {
  return (
    <div
      style={{
        border: "3px dashed #FFD700", // Golden procrastination theme
        borderRadius: "10px",
        padding: "20px",
        margin: "10px auto",
        width: "350px",
        textAlign: "center",
        backgroundColor: task.completed ? "#32CD32" : "#222",
        color: "#fff",
        opacity: task.completed ? 0.6 : 1,
        textDecoration: task.completed ? "line-through" : "none",
        transition: "0.3s ease-in-out",
      }}
    >
      <h2>📝 {task.title}</h2>
      <p>
        {task.description ||
          "No description provided, probably procrastinating…"}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {task.completed ? "✅ Completed (Miracle!)" : "⏳ Meh, later…"}
      </p>

      <p>❌ Excuse: {excuse}</p>
      <p>💪 Motivation: {motivation}</p>

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
          marginTop: "10px",
        }}
      >
        {task.completed ? "Oops, I’ll do it now" : "Eh… Fine, I'll do it"}
      </button>
    </div>
  );
};

export default TaskCard;
