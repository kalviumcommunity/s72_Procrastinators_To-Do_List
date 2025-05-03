import React, { useState } from "react";

const excuses = [
  "You deserve a break! Netflix is calling your name...",
  "Future You will handle it. They're way more responsible.",
  "It's not procrastination, it's 'strategic task deferment'!",
  "Your cat needs emotional support right now.",
  "You can't rush perfection. Or start it, apparently.",
  "Mercury is in retrograde. Best to avoid productivity.",
  "Studies show working too hard can lead to... uh... stuff.",
  "Is that a bird outside? Better check for 20 minutes.",
  "Your horoscope said to avoid responsibility today.",
  "That task isn't getting any younger, but neither are you!",
  "Someone on the internet is WRONG! Must correct immediately!",
  "That YouTube rabbit hole isn't going to explore itself.",
  "The task isn't due for hours! That's practically forever!",
  "Your brain needs more snacks before it can function properly.",
  "You should reorganize your music collection first.",
];

function ProcrastinationButton({ taskName = "this task" }) {
  const [excuse, setExcuse] = useState("");
  const [buttonText, setButtonText] = useState("Procrastinate Now!");
  const [clickCount, setClickCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const generateExcuse = () => {
    const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
    setExcuse(randomExcuse);
    setClickCount(clickCount + 1);

    // Change button text based on click count
    if (clickCount === 0) {
      setButtonText("Just One More Delay...");
    } else if (clickCount === 1) {
      setButtonText("Procrastinate Again!");
    } else if (clickCount === 2) {
      setButtonText("Master Procrastinator!");
    } else if (clickCount === 3) {
      setButtonText("PhD in Avoidance");
    } else if (clickCount === 4) {
      setButtonText("Achievement Unlocked: Legendary Laziness");
    } else {
      setButtonText(`Procrastinated ${clickCount + 1} Times!`);
    }

    // Add shake animation
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <div className="procrastination-module">
      <button
        className={`procrastination-button ${isShaking ? "shake" : ""}`}
        onClick={generateExcuse}
      >
        {buttonText}
      </button>

      {excuse && (
        <div className="excuse-bubble">
          <p>"{excuse}"</p>
          <div className="task-status">
            <span className="postponed-tag">
              ✓ {taskName} successfully postponed!
            </span>
            <span className="time-added">+1 day added to deadline</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProcrastinationButton;
