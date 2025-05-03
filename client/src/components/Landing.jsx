import React, { useState } from "react";
import "../App.css";
import ProcrastinationButton from "./features/ProcrastinationButton";
import ExcuseGenerator from "./features/ExcuseGenerator";
import Leaderboard from "./features/Leaderboard";
import TaskGraveyard from "./features/TaskGraveyard";
import ProductivityInsights from "./features/ProductivityInsights";
import FunNotifications from "./features/FunNotifications";
import DeadlineShifter from "./features/DeadlineShifter";

function Landing() {
  const [activeFeature, setActiveFeature] = useState("");

  const renderFeature = () => {
    switch (activeFeature) {
      case "excuse-generator":
        return <ExcuseGenerator />;
      case "leaderboard":
        return <Leaderboard />;
      case "task-graveyard":
        return <TaskGraveyard />;
      case "productivity-insights":
        return <ProductivityInsights />;
      case "fun-notifications":
        return <FunNotifications />;
      case "deadline-shifter":
        return <DeadlineShifter />;
      default:
        return null;
    }
  };

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>The Ultimate Procrastinator's Paradise</h1>
        <p className="tagline">
          Because why do today what you can perfectly avoid until tomorrow?
        </p>
        <ProcrastinationButton taskName="using this app productively" />
      </header>

      <section className="features-section">
        <h2>Expert Procrastination Tools</h2>
        <div className="features-grid">
          <div
            className={`feature-card ${
              activeFeature === "excuse-generator" ? "active" : ""
            }`}
            onClick={() =>
              setActiveFeature(
                activeFeature === "excuse-generator" ? "" : "excuse-generator"
              )
            }
          >
            <h3>Excuse Generator 3000</h3>
            <p>
              "My cat ate my motivation" and other award-winning excuses at your
              fingertips!
            </p>
            <div className="card-action">
              {activeFeature === "excuse-generator" ? "Close ▲" : "Try it ▼"}
            </div>
          </div>
          <div
            className={`feature-card ${
              activeFeature === "deadline-shifter" ? "active" : ""
            }`}
            onClick={() =>
              setActiveFeature(
                activeFeature === "deadline-shifter" ? "" : "deadline-shifter"
              )
            }
          >
            <h3>Deadline? What Deadline?</h3>
            <p>
              Our revolutionary calendar makes deadlines look optional and far,
              far away
            </p>
            <div className="card-action">
              {activeFeature === "deadline-shifter" ? "Close ▲" : "Try it ▼"}
            </div>
          </div>
          <div
            className={`feature-card ${
              activeFeature === "fun-notifications" ? "active" : ""
            }`}
            onClick={() =>
              setActiveFeature(
                activeFeature === "fun-notifications" ? "" : "fun-notifications"
              )
            }
          >
            <h3>Productivity Preventer</h3>
            <p>
              Automatic notifications when you're being too productive: "Have
              you seen this cat video?"
            </p>
            <div className="card-action">
              {activeFeature === "fun-notifications" ? "Close ▲" : "Try it ▼"}
            </div>
          </div>
          <div
            className={`feature-card ${
              activeFeature === "task-graveyard" ? "active" : ""
            }`}
            onClick={() =>
              setActiveFeature(
                activeFeature === "task-graveyard" ? "" : "task-graveyard"
              )
            }
          >
            <h3>Task Hibernation Zone</h3>
            <p>
              Where your tasks go to take a long, peaceful nap until you're
              absolutely forced to do them
            </p>
            <div className="card-action">
              {activeFeature === "task-graveyard" ? "Close ▲" : "Try it ▼"}
            </div>
          </div>
        </div>
      </section>

      {activeFeature && (
        <section className="feature-demo">{renderFeature()}</section>
      )}

      <section className="more-features">
        <h2>More Ways to Not Do Things</h2>
        <div className="more-features-grid">
          <div
            className={`more-feature-card ${
              activeFeature === "productivity-insights" ? "active" : ""
            }`}
            onClick={() =>
              setActiveFeature(
                activeFeature === "productivity-insights"
                  ? ""
                  : "productivity-insights"
              )
            }
          >
            <div className="more-feature-icon">📊</div>
            <div className="more-feature-content">
              <h3>Procrastination Statistics</h3>
              <p>
                Track how effectively you're avoiding responsibilities with
                colorful charts and graphs.
              </p>
              <div className="card-action small">
                {activeFeature === "productivity-insights"
                  ? "Close ▲"
                  : "Try it ▼"}
              </div>
            </div>
          </div>
          <div
            className={`more-feature-card ${
              activeFeature === "leaderboard" ? "active" : ""
            }`}
            onClick={() =>
              setActiveFeature(
                activeFeature === "leaderboard" ? "" : "leaderboard"
              )
            }
          >
            <div className="more-feature-icon">🏆</div>
            <div className="more-feature-content">
              <h3>Procrastination Leaderboard</h3>
              <p>
                Compete with others to see who can put off the most tasks for
                the longest time.
              </p>
              <div className="card-action small">
                {activeFeature === "leaderboard" ? "Close ▲" : "Try it ▼"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>Satisfied Procrastinators</h2>
        <div className="testimonial-item">
          <p>"I was going to write a testimonial, but I'll do it later."</p>
          <span>— Anonymous (they'll tell us their name eventually)</span>
        </div>
        <div className="testimonial-item">
          <p>
            "Thanks to this app, I've mastered the art of doing absolutely
            nothing while feeling completely justified!"
          </p>
          <span>— Someone who was supposed to be working right now</span>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Embrace Your Inner Procrastinator?</h2>
        <p>
          Start avoiding responsibilities with style! (You can always sign up
          later...)
        </p>
        <button className="cta-button">Maybe Later</button>
        <button className="secondary-button">I'll Think About It</button>
      </section>

      <footer className="landing-footer">
        <p>
          &copy; 2025-ish Procrastinator's Paradise (We haven't gotten around to
          filing the paperwork yet)
        </p>
        <p className="disclaimer">
          * Any resemblance to actual productivity is purely coincidental and
          unintentional
        </p>
      </footer>
    </div>
  );
}

export default Landing;
