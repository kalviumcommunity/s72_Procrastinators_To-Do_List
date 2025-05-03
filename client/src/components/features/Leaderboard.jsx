import React, { useState } from "react";

// Mock data for procrastinators
const initialProcrastinators = [
  {
    id: 1,
    name: "TaskDodger3000",
    avatar: "🦥",
    score: 9876,
    tasksAvoided: 134,
    excusesUsed: 89,
    badges: ["Master Avoider", "Deadline Denier", "Excuse Expert"],
    specialAward: "Golden Snooze Button 🏆",
  },
  {
    id: 2,
    name: "ProcrastiQueen",
    avatar: "🦄",
    score: 8765,
    tasksAvoided: 121,
    excusesUsed: 76,
    badges: ["Professional Later-er", "Netflix Marathon Champion"],
    specialAward: "Diamond Couch Potato 💎",
  },
  {
    id: 3,
    name: "DeadlineDefeater",
    avatar: "🐢",
    score: 7654,
    tasksAvoided: 98,
    excusesUsed: 65,
    badges: ["Alarm Snoozer", "Tomorrow Specialist"],
    specialAward: "Platinum Postponer 🥈",
  },
  {
    id: 4,
    name: "LazyLegend",
    avatar: "🐼",
    score: 6543,
    tasksAvoided: 85,
    excusesUsed: 52,
    badges: ["Nap Enthusiast", "Browser of Infinite Tabs"],
    specialAward: "Silver Slacker 🔶",
  },
  {
    id: 5,
    name: "DistractionMaster",
    avatar: "🦊",
    score: 5432,
    tasksAvoided: 67,
    excusesUsed: 43,
    badges: ["Social Media Surfer", "YouTube Rabbit Hole Explorer"],
    specialAward: "Bronze Bypasser 🥉",
  },
];

// Badge explanations
const badgeDescriptions = {
  "Master Avoider": "Successfully avoided 100+ tasks without anyone noticing",
  "Deadline Denier": "Convinced yourself that deadlines are merely suggestions",
  "Excuse Expert": "Created 50+ unique excuses that actually worked",
  "Professional Later-er":
    "Perfected the art of saying 'I'll do it later' in 20 different languages",
  "Netflix Marathon Champion":
    "Watched an entire series instead of working on an urgent task",
  "Alarm Snoozer": "Snoozed alarms a total of 500+ times",
  "Tomorrow Specialist":
    "Consistently moved today's tasks to tomorrow for 30 days straight",
  "Nap Enthusiast": "Took strategic naps during high-priority task times",
  "Browser of Infinite Tabs":
    "Maintained 50+ open browser tabs for 'research purposes'",
  "Social Media Surfer":
    "Checked social media every 5 minutes during work hours",
  "YouTube Rabbit Hole Explorer":
    "Started researching work topic, ended up watching cat videos for 3 hours",
};

function Leaderboard() {
  const [procrastinators, setProcrastinators] = useState(
    initialProcrastinators
  );
  const [filter, setFilter] = useState("score");
  const [showUserForm, setShowUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    avatar: "🦦",
    score: Math.floor(Math.random() * 1000) + 2000,
    tasksAvoided: Math.floor(Math.random() * 40) + 10,
    excusesUsed: Math.floor(Math.random() * 30) + 5,
    badges: ["Beginner Procrastinator"],
    specialAward: "Participation Trophy 🏅",
  });
  const [selectedBadge, setSelectedBadge] = useState(null);

  const sortedProcrastinators = [...procrastinators].sort(
    (a, b) => b[filter] - a[filter]
  );

  const avatarOptions = [
    "🦥",
    "🦄",
    "🐢",
    "🐼",
    "🦊",
    "🦦",
    "🐨",
    "🐱",
    "🦁",
    "🐵",
  ];

  const handleAddUser = () => {
    if (newUser.name.trim() === "") {
      alert("Please enter a name. Or don't... we understand procrastination.");
      return;
    }

    setProcrastinators([
      ...procrastinators,
      {
        ...newUser,
        id: procrastinators.length + 1,
      },
    ]);

    setShowUserForm(false);
    setNewUser({
      name: "",
      avatar: "🦦",
      score: Math.floor(Math.random() * 1000) + 2000,
      tasksAvoided: Math.floor(Math.random() * 40) + 10,
      excusesUsed: Math.floor(Math.random() * 30) + 5,
      badges: ["Beginner Procrastinator"],
      specialAward: "Participation Trophy 🏅",
    });
  };

  const handleAvatarChange = (avatar) => {
    setNewUser({ ...newUser, avatar });
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2 className="leaderboard-title">
          <span className="trophy-icon">🏆</span>
          Procrastination Hall of Fame
          <span className="trophy-icon">🏆</span>
        </h2>
        <p className="leaderboard-subtitle">
          Where doing nothing is celebrated!
        </p>
      </div>

      <div className="filter-controls">
        <span>Sort by:</span>
        <button
          className={`filter-button ${filter === "score" ? "active" : ""}`}
          onClick={() => setFilter("score")}
        >
          Procrastination Score
        </button>
        <button
          className={`filter-button ${
            filter === "tasksAvoided" ? "active" : ""
          }`}
          onClick={() => setFilter("tasksAvoided")}
        >
          Tasks Avoided
        </button>
        <button
          className={`filter-button ${
            filter === "excusesUsed" ? "active" : ""
          }`}
          onClick={() => setFilter("excusesUsed")}
        >
          Excuses Used
        </button>
      </div>

      <div className="leaderboard-table">
        <div className="leaderboard-header-row">
          <span>Rank</span>
          <span>Procrastinator</span>
          <span>Score</span>
          <span>Tasks Avoided</span>
          <span>Excuses Used</span>
          <span>Badges</span>
          <span>Special Award</span>
        </div>

        {sortedProcrastinators.map((procrastinator, index) => (
          <div
            key={procrastinator.id}
            className={`leaderboard-row ${index < 3 ? "top-three" : ""}`}
          >
            <span className="rank">
              {index === 0
                ? "🥇"
                : index === 1
                ? "🥈"
                : index === 2
                ? "🥉"
                : `#${index + 1}`}
            </span>
            <span className="procrastinator-info">
              <span className="avatar">{procrastinator.avatar}</span>
              <span className="name">{procrastinator.name}</span>
            </span>
            <span className="score">
              {procrastinator.score.toLocaleString()}
            </span>
            <span className="tasks-avoided">{procrastinator.tasksAvoided}</span>
            <span className="excuses-used">{procrastinator.excusesUsed}</span>
            <span className="badges">
              {procrastinator.badges.map((badge, i) => (
                <span
                  key={i}
                  className="badge-icon"
                  title={badge}
                  onClick={() => setSelectedBadge(badge)}
                >
                  🏅
                </span>
              ))}
            </span>
            <span className="special-award">{procrastinator.specialAward}</span>
          </div>
        ))}
      </div>

      {!showUserForm ? (
        <button
          className="add-user-button"
          onClick={() => setShowUserForm(true)}
        >
          Join the Leaderboard (or do it later)
        </button>
      ) : (
        <div className="user-form">
          <h3>Join the Elite Procrastinators</h3>
          <div className="form-group">
            <label>Your Procrastinator Name:</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Or fill this out later..."
            />
          </div>
          <div className="form-group">
            <label>Choose Your Spirit Animal:</label>
            <div className="avatar-options">
              {avatarOptions.map((avatar, index) => (
                <span
                  key={index}
                  className={`avatar-option ${
                    newUser.avatar === avatar ? "selected" : ""
                  }`}
                  onClick={() => handleAvatarChange(avatar)}
                >
                  {avatar}
                </span>
              ))}
            </div>
          </div>
          <div className="form-buttons">
            <button className="submit-button" onClick={handleAddUser}>
              Join Leaderboard
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowUserForm(false)}
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}

      {selectedBadge && (
        <div className="badge-modal">
          <div className="badge-modal-content">
            <span
              className="close-modal"
              onClick={() => setSelectedBadge(null)}
            >
              ×
            </span>
            <h3>Achievement Unlocked: {selectedBadge}</h3>
            <div className="badge-display">
              <span className="big-badge">🏅</span>
            </div>
            <p className="badge-description">
              {badgeDescriptions[selectedBadge] ||
                "This procrastinator has achieved legendary status in avoiding tasks."}
            </p>
            <button
              className="close-button"
              onClick={() => setSelectedBadge(null)}
            >
              Acknowledge (eventually)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
