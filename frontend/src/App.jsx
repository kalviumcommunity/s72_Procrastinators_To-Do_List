import { useState } from "react";
import { addTask } from "./services/api";
import TaskList from "./componenets/TaskList";
import TaskGraveyard from "./componenets/TaskGraveyard";
import ProductivityInsights from "./componenets/ProductivityInsights";

function App() {
  const [activeView, setActiveView] = useState("tasks"); // "tasks", "graveyard", "insights"
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle adding a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await addTask(newTask);
      if (response && response.task) {
        // Reset form
        setNewTask({
          title: "",
          description: "",
          priority: "Medium",
          deadline: "",
        });

        // Force refresh of TaskList component by changing key
        setActiveView("other");
        setTimeout(() => setActiveView("tasks"), 10);
      }
    } catch (error) {
      console.error("❌ Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };

  // Navigation buttons
  const renderNavButtons = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        margin: "20px 0",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() => setActiveView("tasks")}
        style={{
          padding: "10px 15px",
          backgroundColor: activeView === "tasks" ? "#2980b9" : "#555",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        📝 Tasks
      </button>
      <button
        onClick={() => setActiveView("graveyard")}
        style={{
          padding: "10px 15px",
          backgroundColor: activeView === "graveyard" ? "#8e44ad" : "#555",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        💀 Task Graveyard
      </button>
      <button
        onClick={() => setActiveView("insights")}
        style={{
          padding: "10px 15px",
          backgroundColor: activeView === "insights" ? "#16a085" : "#555",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        📊 Insights
      </button>
    </div>
  );

  // Render task form
  const renderTaskForm = () => (
    <form
      onSubmit={handleAddTask}
      style={{
        marginBottom: "20px",
        backgroundColor: "#333",
        padding: "20px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <div>
        <input
          type="text"
          placeholder="Task title..."
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
          style={{
            padding: "10px",
            width: "100%",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #555",
          }}
        />
      </div>

      <div>
        <textarea
          placeholder="Task description... or don't bother, who cares?"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          style={{
            padding: "10px",
            width: "100%",
            fontSize: "16px",
            minHeight: "100px",
            borderRadius: "5px",
            border: "1px solid #555",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        <div style={{ flex: "1" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Priority:
          </label>
          <select
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
            style={{
              padding: "10px",
              width: "100%",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #555",
            }}
          >
            <option value="Low">Low 🟢</option>
            <option value="Medium">Medium 🟡</option>
            <option value="High">High 🔥</option>
          </select>
        </div>

        <div style={{ flex: "1" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Deadline (Optional):
          </label>
          <input
            type="date"
            value={newTask.deadline}
            onChange={(e) =>
              setNewTask({ ...newTask, deadline: e.target.value })
            }
            style={{
              padding: "10px",
              width: "100%",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #555",
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "12px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Adding..." : "➕ Add Task (or procrastinate it later)"}
      </button>
    </form>
  );

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "2.5rem" }}>
          🕰️ Procrastinator's To-Do List 😴
        </h1>
        <h3>The to-do list that *understands* your desire to do nothing.</h3>
      </div>

      {renderNavButtons()}

      {activeView === "tasks" && (
        <>
          {renderTaskForm()}
          <TaskList key={`task-list-${Date.now()}`} />
        </>
      )}

      {activeView === "graveyard" && <TaskGraveyard />}

      {activeView === "insights" && <ProductivityInsights />}
    </div>
  );
}

export default App;
