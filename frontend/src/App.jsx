import { useState } from "react";

const excuses = [
  "Why do it now when Future You can suffer instead?",
  "Hard work pays off later… but laziness pays off now.",
  "Procrastinators unite!... tomorrow.",
  "Your bed is calling. Answer it.",
  "If it's urgent, they’ll remind you again, right?",
  "Einstein probably procrastinated too. Be like Einstein.",
];

const motivations = [
  "Your future self is already judging you.",
  "That task isn’t going to do itself… or will it?",
  "Think of how smug you’ll feel after doing this.",
  "DO IT! (But like… after a snack.)",
  "Every second you waste is a second you can never get back. No pressure.",
  "Shia LaBeouf is watching. Just. Do. It.",
];

function App() {
  const [excuse, setExcuse] = useState(
    "Click below to get an excuse for avoiding work."
  );
  const [motivation, setMotivation] = useState(
    "Click below if you need an overly dramatic pep talk."
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full screen height
        width: "100vw", // Full screen width
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "600px", width: "90%" }}>
        <h1>🕰️ Procrastinator’s To-Do List 😴</h1>
        <h3>The to-do list that *understands* you.</h3>
        <p>
          Tired of productivity apps that expect you to be **responsible**?
          We've got you covered. ✨
        </p>

        <div style={{ marginTop: "30px" }}>
          <h2>❌ Need an excuse?</h2>
          <p>{excuse}</p>
          <button
            onClick={() =>
              setExcuse(excuses[Math.floor(Math.random() * excuses.length)])
            }
            style={{
              padding: "10px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "5px",
              backgroundColor: "#f87171",
              color: "white",
              border: "none",
              marginTop: "10px",
            }}
          >
            Generate Excuse
          </button>
        </div>

        <div style={{ marginTop: "30px" }}>
          <h2>💪 Need motivation?</h2>
          <p>{motivation}</p>
          <button
            onClick={() =>
              setMotivation(
                motivations[Math.floor(Math.random() * motivations.length)]
              )
            }
            style={{
              padding: "10px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "5px",
              backgroundColor: "#60a5fa",
              color: "white",
              border: "none",
              marginTop: "10px",
            }}
          >
            Just Do It!
          </button>
        </div>

        <div
          style={{ marginTop: "50px", fontStyle: "italic", fontSize: "14px" }}
        >
          <p>
            Warning: This app is highly addictive and may cause excessive
            laughter.
          </p>
          <p>
            We take no responsibility for missed deadlines. That's on you. 🤷
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
