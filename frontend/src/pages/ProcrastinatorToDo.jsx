import { useState, useEffect } from "react";
import { fetchTasks, addTask } from "../services/api"; // API functions

const excuses = [
  "I’ll do it after one more episode 🎬🍿",
  "My cat needs emotional support right now 🐱",
  "The stars aren’t aligned for this task today ✨",
  "I’ll start after I scroll for 5 more minutes... ⏳",
  "I work best under pressure. Tomorrow is the day! 😎",
];

const motivations = [
  "🚀 JUST DO IT! (No, really.)",
  "💪 Your future self will high-five you for this!",
  "🔥 Stop thinking, start doing!",
  "🏆 Every small step gets you closer to greatness!",
  "😈 Imagine telling your past self you still haven’t done it...",
];

const ProcrastinatorToDo = () => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  // 📝 Load tasks when component mounts
  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };
    loadTasks();
  }, []);

  // ➕ Handle Task Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Task title cannot be empty!");

    const newTask = {
      title,
      excuse: excuses[Math.floor(Math.random() * excuses.length)],
      motivation: motivations[Math.floor(Math.random() * motivations.length)],
    };

    await addTask(newTask); // Add to the backend
    setTasks([...tasks, newTask]); // Update the frontend list
    setTitle(""); // Reset form fields
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}
    >
      <h2>📝 Procrastinator's To-Do List</h2>
      <p>Where deadlines are a suggestion and excuses are an art. 🎭</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          ➕ Add Task (And Probably Ignore It)
        </button>
      </form>

      <h3>📋 Your Pending Excuses</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{ textAlign: "left", margin: "10px 0" }}>
            <strong>{task.title}</strong>
            <br />❌ Excuse: {task.excuse}
            <br />
            💪 Motivation: {task.motivation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProcrastinatorToDo;
