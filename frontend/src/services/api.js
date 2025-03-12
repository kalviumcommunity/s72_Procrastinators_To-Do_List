const BASE_URL = "http://localhost:5000/api"; // Change this if your backend is deployed

export const fetchTasks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tasks`);
    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    return [];
  }
};

export const addTask = async (taskData) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    return await response.json();
  } catch (error) {
    console.error("❌ Error adding task:", error);
  }
};

export const updateTaskStatus = async (taskId, completed) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    return await response.json();
  } catch (error) {
    console.error("❌ Error updating task:", error);
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.error("❌ Error deleting task:", error);
  }
};
