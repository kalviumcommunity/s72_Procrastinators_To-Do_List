import { useState } from "react";

// List of creative procrastination excuses
const excuses = [
  "Why do it now when Future You can suffer instead?",
  "Hard work pays off later… but laziness pays off now.",
  "Procrastinators unite!... tomorrow.",
  "Your bed is calling. Answer it.",
  "If it's urgent, they'll remind you again, right?",
  "Einstein probably procrastinated too. Be like Einstein.",
  "This task is like fine wine - it gets better with age.",
  "The deadline is more of a suggestion, really.",
  "You've earned a break... since the last break.",
  "Your brain cells need rest to perform optimally later.",
  "It's not procrastination, it's 'task marination'.",
  "Let's be honest, are you really in the right mindset for this?",
  "Do you really want to peak too early?",
  "Future You might have more energy for this.",
  "The pressure of the last minute is when you do your best work.",
  "New research suggests waiting improves creativity.",
  "Aren't there more important things to do now? Like scrolling?",
  "You should probably check your email one more time first.",
  "The planets aren't aligned for productivity today.",
  "Successful people know when to delay the unimportant.",
];

const ExcuseGenerator = ({ onSelectExcuse }) => {
  const [currentExcuse, setCurrentExcuse] = useState("");

  // Generate a random excuse
  const generateRandomExcuse = () => {
    const randomIndex = Math.floor(Math.random() * excuses.length);
    const excuse = excuses[randomIndex];
    setCurrentExcuse(excuse);

    // If there's a callback, call it with the new excuse
    if (onSelectExcuse) {
      onSelectExcuse(excuse);
    }
  };

  return (
    <div className="excuse-generator">
      <h3>🎭 Excuse Generator</h3>
      <div className="excuse-box">
        {currentExcuse ? (
          <p className="generated-excuse">{currentExcuse}</p>
        ) : (
          <p className="excuse-placeholder">Need an excuse? Generate one!</p>
        )}
      </div>
      <button
        onClick={generateRandomExcuse}
        style={{
          background: "#FF6B6B",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
          fontSize: "16px",
        }}
      >
        Generate Excuse
      </button>
    </div>
  );
};

export default ExcuseGenerator;
