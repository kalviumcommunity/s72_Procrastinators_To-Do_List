import { useState, useEffect } from "react";
import { fetchProcrastinationStats } from "../services/api";

const ProductivityInsights = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    graveyardTasks: 0,
    totalPostponements: 0,
    completionRate: "0%",
    procrastinationRate: 0,
    mostPostponedTask: null,
    recentlyPostponed: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const fetchedStats = await fetchProcrastinationStats();
        setStats(fetchedStats);
      } catch (error) {
        setError("⚠️ Error fetching procrastination stats. Please try again.");
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) return <p>⏳ Calculating your procrastination levels...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="productivity-insights">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2>📊 Procrastination Insights</h2>
        <p>Your productivity (or lack thereof) visualized!</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          margin: "20px 0",
        }}
      >
        {/* Total Tasks Stat */}
        <div
          style={{
            backgroundColor: "#2C3E50",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>📝 Total Tasks</h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", margin: "10px 0" }}>
            {stats.totalTasks}
          </p>
        </div>

        {/* Completed Tasks Stat */}
        <div
          style={{
            backgroundColor: "#27AE60",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>✅ Completed</h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", margin: "10px 0" }}>
            {stats.completedTasks}
          </p>
          <p>Rate: {stats.completionRate}</p>
        </div>

        {/* Procrastinated Tasks Stat */}
        <div
          style={{
            backgroundColor: "#E74C3C",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>⏳ Postponements</h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", margin: "10px 0" }}>
            {stats.totalPostponements}
          </p>
          <p>{stats.recentlyPostponed} in the last week</p>
        </div>

        {/* Graveyard Tasks Stat */}
        <div
          style={{
            backgroundColor: "#8E44AD",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>💀 In Graveyard</h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", margin: "10px 0" }}>
            {stats.graveyardTasks}
          </p>
        </div>
      </div>

      {/* Procrastination Champion */}
      {stats.mostPostponedTask && (
        <div
          style={{
            backgroundColor: "#F39C12",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>🏆 Procrastination Champion</h3>
          <p>
            <strong>"{stats.mostPostponedTask.title}"</strong> has been
            postponed{" "}
            <strong>{stats.mostPostponedTask.postponedCount} times</strong>!
            That's some impressive procrastination.
          </p>
        </div>
      )}

      {/* Procrastination Wisdom */}
      <div
        style={{
          backgroundColor: "#34495E",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
          textAlign: "center",
          fontStyle: "italic",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p>
          {stats.procrastinationRate > 3
            ? "You're a procrastination master! Your future self must really hate you."
            : stats.procrastinationRate > 1
            ? "You're showing promise as a procrastinator. Keep avoiding those tasks!"
            : "You're not procrastinating enough. Try harder to avoid your responsibilities!"}
        </p>
      </div>
    </div>
  );
};

export default ProductivityInsights;
