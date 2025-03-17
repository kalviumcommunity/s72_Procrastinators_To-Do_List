import { useState, useEffect } from "react";
import axios from "axios";

const excuses = [
  "I'll do it tomorrow… or next year",
  "But first, let me take a nap",
  "Waiting for the perfect cosmic alignment",
  "Procrastination is an art, and I'm Picasso",
  "My coffee is brewing, can't start without it",
];

const AddTask = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [excuse, setExcuse] = useState("");

  // Fetch tasks from the server on page load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task) return alert("At least type something before you ignore it!");

    try {
      const response = await axios.post("http://localhost:5000/api/tasks", {
        name: task,
        description: excuses[Math.floor(Math.random() * excuses.length)],
      });
      setTasks([...tasks, response.data]);
      setTask("");
      setExcuse(response.data.description); // Show the assigned excuse
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>📝 Add Your Procrastination Task</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          margin: "auto",
        }}
      >
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What do you plan to avoid today?"
          required
        />
        <button type="submit">Add Task (to Ignore)</button>
      </form>

      {excuse && (
        <p>
          🔹 <strong>Procrastination Excuse:</strong> {excuse}
        </p>
      )}

      <h3>📋 Your To-Do (or Not-To-Do) List</h3>
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            {t.name} - <strong>{t.description}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddTask;
