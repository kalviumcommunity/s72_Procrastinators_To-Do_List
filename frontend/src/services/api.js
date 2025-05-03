const BASE_URL = "http://localhost:5000/api"; // Change this if backend is deployed

export const fetchTasks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tasks`);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    return []; // Ensure empty array is returned to prevent UI crashes
  }
};

export const addTask = async (taskData) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error("Failed to add task");
    return await response.json();
  } catch (error) {
    console.error("❌ Error adding task:", error);
    return null;
  }
};

// ✅ New function for updating the task title & description
export const updateTask = async (taskId, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error("Failed to update task");
    return await response.json();
  } catch (error) {
    console.error("❌ Error updating task:", error);
    return null;
  }
};

// ✅ Separate function for updating task status (completion)
export const updateTaskStatus = async (taskId, completed) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}/toggle`, {
      method: "PATCH", // Using PATCH for partial update
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    if (!response.ok) throw new Error("Failed to update task status");
    return await response.json();
  } catch (error) {
    console.error("❌ Error updating task status:", error);
    return null;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete task");
    return await response.json();
  } catch (error) {
    console.error("❌ Error deleting task:", error);
    return null;
  }
};

// ✅ NEW: Procrastinate a task (postpone it)
export const procrastinateTask = async (taskId, data) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}/procrastinate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // { excuse, daysToPostpone }
    });
    if (!response.ok) throw new Error("Failed to procrastinate task");
    return await response.json();
  } catch (error) {
    console.error("❌ Error procrastinating task:", error);
    return null;
  }
};

// ✅ NEW: Get tasks from the graveyard
export const fetchGraveyardTasks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/graveyard`);
    if (!response.ok) throw new Error("Failed to fetch graveyard tasks");
    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching graveyard tasks:", error);
    return [];
  }
};

// ✅ NEW: Get procrastination statistics
export const fetchProcrastinationStats = async () => {
  try {
    const response = await fetch(`${BASE_URL}/stats`);
    if (!response.ok) throw new Error("Failed to fetch procrastination stats");
    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching procrastination stats:", error);
    return {
      totalTasks: 0,
      completedTasks: 0,
      graveyardTasks: 0,
      totalPostponements: 0,
      completionRate: "0%",
      procrastinationRate: 0,
      mostPostponedTask: null,
      recentlyPostponed: 0,
    };
  }
};
