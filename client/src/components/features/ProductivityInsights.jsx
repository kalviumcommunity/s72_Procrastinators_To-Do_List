import React, { useState } from "react";

// Mock data for procrastination statistics
const mockStats = {
  tasksPostponed: 42,
  excusesGenerated: 38,
  totalProcrastinationTime: 127, // in hours
  longestTaskAvoidance: 67, // in days
  mostCommonExcuse: "I'll do it tomorrow",
  productivityRating: 3, // out of 100
  procrastinationLevel: "Professional",
  timeSaved: 54, // in hours by not doing tasks
  motivationLevel: "Hibernating",
  tasksCompletedBeforeDeadline: 2,
  averageDelayPerTask: 5.7, // in days
  procrastinationStreak: 19, // days
};

// Chart data for weekly procrastination
const weeklyData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  procrastination: [65, 72, 86, 81, 95, 45, 30], // percentage of day spent procrastinating
};

// Funny insights based on stats
const generateInsights = (stats) => [
  `You've postponed ${stats.tasksPostponed} tasks this week. Your dedication to avoidance is inspiring!`,
  `Your productivity rating is ${stats.productivityRating}%. Congratulations on achieving almost perfect procrastination!`,
  `You're on a ${stats.procrastinationStreak}-day procrastination streak. Keep not-doing it!`,
  `Your excuse creativity is in the top 5% of all users. Have you considered a career in creative writing?`,
  `If procrastination burned calories, you'd have lost 27 pounds this month.`,
  `You've "saved" ${stats.timeSaved} hours by not doing your tasks. Time well wasted!`,
  `Your motivation level is "${stats.motivationLevel}". Have you tried poking it with a stick?`,
  `At your current rate, you'll complete your to-do list by the year 2047.`,
  `You're officially a Level 9 Task Avoider. Just one more level until you unlock "The Void of Eternal Later".`,
];

function ProductivityInsights() {
  const [stats] = useState(mockStats);
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState("optimistic");
  const [insights] = useState(generateInsights(stats));
  const [currentInsight, setCurrentInsight] = useState(0);

  // Toggle between realistic and optimistic views
  const toggleViewMode = () => {
    setViewMode(viewMode === "realistic" ? "optimistic" : "realistic");
  };

  // Show next insight
  const showNextInsight = () => {
    setCurrentInsight((currentInsight + 1) % insights.length);
  };

  // Get adjusted stat value based on view mode
  const getAdjustedStat = (value, invert = false) => {
    if (viewMode === "realistic") return value;

    // In optimistic mode, we show more "positive" numbers
    return invert
      ? Math.max(1, Math.floor(value * 0.2)) // Lower is better for these stats
      : Math.min(99, Math.floor(value * 3)); // Higher is better for these
  };

  return (
    <div className="productivity-insights">
      <div className="insights-header">
        <h2>
          <span className="insights-icon">📊</span>
          Procrastination Insights
          <span className="insights-icon">🔍</span>
        </h2>
        <div className="view-toggle">
          <button
            className={`view-button ${
              viewMode === "realistic" ? "active" : ""
            }`}
            onClick={toggleViewMode}
          >
            {viewMode === "realistic" ? "😓 Reality Check" : "🌈 Fantasy Mode"}
          </button>
        </div>
      </div>

      <div className="insight-bubble" onClick={showNextInsight}>
        <p>{insights[currentInsight]}</p>
        <small>Click for more wisdom</small>
      </div>

      <div className="insights-tabs">
        <button
          className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Procrastination Overview
        </button>
        <button
          className={`tab-button ${activeTab === "weekly" ? "active" : ""}`}
          onClick={() => setActiveTab("weekly")}
        >
          Weekly Breakdown
        </button>
        <button
          className={`tab-button ${activeTab === "excuses" ? "active" : ""}`}
          onClick={() => setActiveTab("excuses")}
        >
          Excuse Analytics
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="overview-stats">
          <div className="stat-card">
            <div className="stat-value">
              {getAdjustedStat(stats.tasksPostponed, true)}
            </div>
            <div className="stat-label">Tasks Postponed</div>
            <div className="stat-icon">📅</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {viewMode === "realistic"
                ? stats.procrastinationLevel
                : "Beginner"}
            </div>
            <div className="stat-label">Procrastination Level</div>
            <div className="stat-icon">🏆</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {getAdjustedStat(stats.averageDelayPerTask, true)} days
            </div>
            <div className="stat-label">Average Delay</div>
            <div className="stat-icon">⏰</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {getAdjustedStat(stats.productivityRating, false)}%
            </div>
            <div className="stat-label">Productivity Rating</div>
            <div className="stat-icon">📈</div>
          </div>
          <div className="stat-card emphasis">
            <div className="stat-value">
              {getAdjustedStat(stats.procrastinationStreak, true)} days
            </div>
            <div className="stat-label">Current Procrastination Streak</div>
            <div className="stat-icon">🔥</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {getAdjustedStat(stats.timeSaved, true)} hrs
            </div>
            <div className="stat-label">"Saved" Time</div>
            <div className="stat-icon">⌛</div>
          </div>
        </div>
      )}

      {activeTab === "weekly" && (
        <div className="weekly-breakdown">
          <div className="chart-container">
            <div className="chart-title">Your Week in Procrastination</div>
            <div className="mock-chart">
              {weeklyData.labels.map((day, index) => (
                <div key={index} className="chart-bar-container">
                  <div className="day-label">{day}</div>
                  <div
                    className="chart-bar"
                    style={{
                      height: `${
                        viewMode === "realistic"
                          ? weeklyData.procrastination[index]
                          : Math.max(
                              15,
                              100 - weeklyData.procrastination[index]
                            )
                      }%`,
                    }}
                  ></div>
                  <div className="bar-value">
                    {viewMode === "realistic"
                      ? weeklyData.procrastination[index]
                      : Math.max(15, 100 - weeklyData.procrastination[index])}
                    %
                  </div>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color"></div>
                <div className="legend-label">
                  {viewMode === "realistic" ? "Time Wasted" : "Productivity"}
                </div>
              </div>
            </div>
          </div>
          <div className="weekly-insight">
            <h3>Weekly Summary</h3>
            <p>
              {viewMode === "realistic"
                ? `Your most productive day was ${
                    weeklyData.labels[
                      weeklyData.procrastination.indexOf(
                        Math.min(...weeklyData.procrastination)
                      )
                    ]
                  } (relatively speaking).`
                : `You're absolutely crushing it! Your productivity is through the roof!`}
            </p>
            <p>
              {viewMode === "realistic"
                ? `You spend an average of ${Math.floor(
                    weeklyData.procrastination.reduce((a, b) => a + b, 0) / 7
                  )}% of your day in strategic task avoidance.`
                : `Your focused work time is impressively high. Keep up the great work!`}
            </p>
          </div>
        </div>
      )}

      {activeTab === "excuses" && (
        <div className="excuse-analytics">
          <div className="top-excuses">
            <h3>Your Top Excuses</h3>
            <div className="excuse-list">
              <div className="excuse-item">
                <div className="excuse-rank">1</div>
                <div className="excuse-content">"I'll do it tomorrow"</div>
                <div className="excuse-count">
                  Used {viewMode === "realistic" ? 27 : 3} times
                </div>
              </div>
              <div className="excuse-item">
                <div className="excuse-rank">2</div>
                <div className="excuse-content">
                  "I need to be in the right mindset"
                </div>
                <div className="excuse-count">
                  Used {viewMode === "realistic" ? 19 : 2} times
                </div>
              </div>
              <div className="excuse-item">
                <div className="excuse-rank">3</div>
                <div className="excuse-content">
                  "I work better under pressure"
                </div>
                <div className="excuse-count">
                  Used {viewMode === "realistic" ? 14 : 1} times
                </div>
              </div>
              <div className="excuse-item">
                <div className="excuse-rank">4</div>
                <div className="excuse-content">
                  "I need to do more research first"
                </div>
                <div className="excuse-count">
                  Used {viewMode === "realistic" ? 12 : 1} times
                </div>
              </div>
              <div className="excuse-item">
                <div className="excuse-rank">5</div>
                <div className="excuse-content">
                  "My cat looked at me funny"
                </div>
                <div className="excuse-count">
                  Used {viewMode === "realistic" ? 8 : 0} times
                </div>
              </div>
            </div>
          </div>
          <div className="excuse-creativity">
            <h3>Excuse Creativity Score</h3>
            <div className="creativity-meter">
              <div
                className="creativity-fill"
                style={{ width: `${viewMode === "realistic" ? 82 : 98}%` }}
              ></div>
            </div>
            <div className="creativity-value">
              {viewMode === "realistic" ? 82 : 98}/100
            </div>
            <p className="creativity-comment">
              {viewMode === "realistic"
                ? "Your excuses are more creative than 82% of users. Consider a career in fiction writing!"
                : "Your excuse creativity is off the charts! You're a natural storyteller!"}
            </p>
          </div>
        </div>
      )}

      <div className="insights-footer">
        <div className="ai-recommendation">
          <h3>AI Recommendation</h3>
          <p>
            {viewMode === "realistic"
              ? "Have you considered embracing your procrastination and turning it into a competitive sport?"
              : "You're doing great! Maybe take a break and treat yourself to a Netflix marathon!"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductivityInsights;
