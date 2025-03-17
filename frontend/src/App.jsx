import { useState, useEffect } from "react";
import axios from "axios";
import ProcrastinatorToDo from "./pages/ProcrastinatorToDo";
import TaskCard from "./componenets/TaskCard";
import { fetchTasks, addTask } from "./services/api";
import AddTask from "./pages/AddTask";

const excuses = [
  "Why do it now when Future You can suffer instead?",
  "Hard work pays off later… but laziness pays off now.",
  "Procrastinators unite!... tomorrow.",
  "Your bed is calling. Answer it.",
  "If it's urgent, they’ll remind you again, right?",
  "Einstein probably procrastinated too. Be like Einstein.",
];

const motivations = [
  "Your future self is already judging you.",
  "That task isn’t going to do itself… or will it?",
  "Think of how smug you’ll feel after doing this.",
  "DO IT! (But like… after a snack.)",
  "Every second you waste is a second you can never get back. No pressure.",
  "Shia LaBeouf is watching. Just. Do. It.",
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  // Fetch tasks from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("❌ Error fetching tasks:", err));
  }, []);

  // Handle adding a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        newTask
      );
      setTasks([...tasks, response.data]); // Update UI instantly
      setNewTask({ title: "", description: "", priority: "Medium" }); // Reset form
    } catch (error) {
      console.error("❌ Error adding task:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>🕰️ Procrastinator’s To-Do List 😴</h1>
      <h3>The to-do list that *understands* you.</h3>

      {/* Task Form */}
      <form onSubmit={handleAddTask} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Task title..."
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Task description..."
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="Low">Low 🟢</option>
          <option value="Medium">Medium 🟡</option>
          <option value="High">High 🔥</option>
        </select>
        <button type="submit">➕ Add Task</button>
      </form>

      {/* Task List */}
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task.title}
            excuse={excuses[Math.floor(Math.random() * excuses.length)]}
            motivation={
              motivations[Math.floor(Math.random() * motivations.length)]
            }
          />
        ))
      ) : (
        <p>No tasks yet! Maybe later? 😆</p>
      )}
    </div>
  );
}

export default App;
