import React, { useState } from "react";

// Categorized excuses
const excuseDatabase = {
  work: [
    "My keyboard doesn't have the keys I need for this task.",
    "I need to alphabetize my desk drawers first.",
    "My productivity aura isn't aligned with my workspace energy.",
    "I can't work until Mercury leaves retrograde.",
    "My pet goldfish looks lonely and needs attention.",
    "Can't work now, I'm conserving my creativity for later.",
    "I'm on a strict schedule of doing nothing until further notice.",
  ],
  personal: [
    "I would, but my bed is too comfortable to leave right now.",
    "My future self promised they'd take care of it.",
    "I'm building character through strategic procrastination.",
    "I'm mentally preparing for the task (day 47).",
    "I need to finish watching this series, for cultural education.",
    "My horoscope advised against productivity today.",
    "I'm allergic to completing tasks on weekdays that end in 'y'.",
  ],
  technological: [
    "My computer is running on vibes, not electricity today.",
    "The cloud ate my motivation.",
    "My internet is experiencing emotional turbulence.",
    "I can't work until my device reaches the perfect temperature.",
    "My software isn't compatible with today's productivity requirements.",
    "My digital feng shui is disrupted by this task.",
    "Error 404: Motivation not found.",
  ],
  cosmic: [
    "The alignment of the stars suggests it's a bad day for productivity.",
    "The universe has asked me to pause all responsibilities.",
    "My third eye is closed for maintenance.",
    "The cosmic energy doesn't support task completion right now.",
    "My chakras are too blocked for any work today.",
    "My astrological sign is currently in the 'nope' house.",
    "I need to recharge my crystal collection before starting any tasks.",
  ],
};

function ExcuseGenerator() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentExcuse, setCurrentExcuse] = useState("");
  const [excuseHistory, setExcuseHistory] = useState([]);
  const [isRotating, setIsRotating] = useState(false);

  const generateExcuse = (category) => {
    const categoryExcuses = excuseDatabase[category];
    const randomExcuse =
      categoryExcuses[Math.floor(Math.random() * categoryExcuses.length)];

    setCurrentExcuse(randomExcuse);
    setSelectedCategory(category);
    setExcuseHistory([
      { category, excuse: randomExcuse, date: new Date().toLocaleString() },
      ...excuseHistory.slice(0, 4),
    ]);

    // Add rotating animation
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
  };

  const saveToClipboard = () => {
    navigator.clipboard
      .writeText(currentExcuse)
      .then(() => {
        alert("Excuse copied! Use it wisely (or not).");
      })
      .catch(() => {
        alert(
          "Failed to copy excuse. Maybe you're destined to be productive after all."
        );
      });
  };

  return (
    <div className="excuse-generator-container">
      <h2 className="excuse-generator-title">
        <span className="excuse-icon">🔮</span>
        Professional Excuse Generator
        <span className="excuse-icon">📝</span>
      </h2>

      <div className="category-buttons">
        <button
          className={`category-button ${
            selectedCategory === "work" ? "active" : ""
          }`}
          onClick={() => generateExcuse("work")}
        >
          Work Excuses
        </button>
        <button
          className={`category-button ${
            selectedCategory === "personal" ? "active" : ""
          }`}
          onClick={() => generateExcuse("personal")}
        >
          Personal Excuses
        </button>
        <button
          className={`category-button ${
            selectedCategory === "technological" ? "active" : ""
          }`}
          onClick={() => generateExcuse("technological")}
        >
          Tech Excuses
        </button>
        <button
          className={`category-button ${
            selectedCategory === "cosmic" ? "active" : ""
          }`}
          onClick={() => generateExcuse("cosmic")}
        >
          Cosmic Excuses
        </button>
      </div>

      {currentExcuse && (
        <div className={`current-excuse ${isRotating ? "rotate-in" : ""}`}>
          <p>"{currentExcuse}"</p>
          <button className="copy-button" onClick={saveToClipboard}>
            Copy to Clipboard
          </button>
        </div>
      )}

      {excuseHistory.length > 0 && (
        <div className="excuse-history">
          <h3>Your Excuse Arsenal</h3>
          <ul>
            {excuseHistory.map((item, index) => (
              <li key={index} className={`history-item ${item.category}`}>
                <span className="excuse-text">"{item.excuse}"</span>
                <span className="excuse-details">
                  <span className="category-tag">{item.category}</span>
                  <span className="date-tag">{item.date}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ExcuseGenerator;
