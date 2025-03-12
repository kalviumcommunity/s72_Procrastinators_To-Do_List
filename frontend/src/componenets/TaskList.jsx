import { useEffect, useState } from "react";
import {
  fetchTasks,
  addTask,
  updateTaskStatus,
  deleteTask,
} from "../services/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };
    loadTasks();
  }, []);

  const handleComplete = async (taskId) => {
    await updateTaskStatus(taskId, true);
    setTasks(
      tasks.map((task) =>
        task._id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  return (
    <div>
      <h2>Procrastinator's Tasks</h2>
      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => handleComplete(task._id)}>Mark as Done</button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
