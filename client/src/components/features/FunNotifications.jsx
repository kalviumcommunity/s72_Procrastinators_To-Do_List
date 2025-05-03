import React, { useState, useEffect } from "react";

// Collection of funny notification messages
const notificationMessages = [
  {
    title: "Still Ignoring Me?",
    message:
      "Fine, I'll wait. I have all the time in the world. I'm just a notification after all...",
    type: "passive-aggressive",
    icon: "😒",
  },
  {
    title: "Breaking News!",
    message: "Your tasks are feeling neglected and considering therapy.",
    type: "news",
    icon: "📰",
  },
  {
    title: "Hello? Is Anyone There?",
    message: "It's me, your forgotten to-do list. Remember me?",
    type: "lonely",
    icon: "👋",
  },
  {
    title: "Impressive Avoidance Skills!",
    message:
      "You've successfully ignored this task for 7 days straight. New personal record!",
    type: "achievement",
    icon: "🏆",
  },
  {
    title: "Your Task is Feeling Abandoned",
    message:
      "It's sitting in the corner listening to sad music and eating ice cream.",
    type: "guilt",
    icon: "😢",
  },
  {
    title: "Task Update",
    message: "Your task has now started doing YOUR job while waiting for you.",
    type: "update",
    icon: "🔄",
  },
  {
    title: "Existential Crisis Alert",
    message:
      "If a task exists on a to-do list but no one completes it, does it really matter?",
    type: "philosophical",
    icon: "🤔",
  },
  {
    title: "Deadline? What Deadline?",
    message: "Time is a social construct anyway. Keep procrastinating!",
    type: "enabling",
    icon: "⏰",
  },
  {
    title: "Attention Required",
    message:
      "Your procrastination skills need maintenance. They're becoming too effective.",
    type: "warning",
    icon: "⚠️",
  },
  {
    title: "Task Birthday Celebration",
    message:
      "Your task is now 30 days old! It's growing up so fast while being completely untouched.",
    type: "celebration",
    icon: "🎂",
  },
];

// Responses when dismissing notifications
const dismissResponses = [
  "Fine, I'll come back later when you're ready to face reality.",
  "Running away from your problems again? Classic you.",
  "I'll just add this to your 'ignored' pile. It's getting quite large!",
  "Dismissed but not forgotten. Unlike your tasks.",
  "That's cool. I wasn't that important anyway...",
  "Another one bites the dust!",
  "Out of sight, out of mind, right?",
  "I'll be back. They always come back.",
  "The task fairy is disappointed in you.",
  "Clicked away faster than your motivation disappears!",
];

function FunNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [showControls, setShowControls] = useState(false);
  const [customInterval, setCustomInterval] = useState(30);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [dismissMessage, setDismissMessage] = useState("");

  // Generate a random notification
  const generateNotification = () => {
    const randomMessage =
      notificationMessages[
        Math.floor(Math.random() * notificationMessages.length)
      ];
    const newNotification = {
      id: Date.now(),
      ...randomMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setNotifications((prev) => [newNotification, ...prev].slice(0, 5));
  };

  // Handle dismissing a notification
  const dismissNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );

    const randomResponse =
      dismissResponses[Math.floor(Math.random() * dismissResponses.length)];
    setDismissMessage(randomResponse);

    setTimeout(() => {
      setDismissMessage("");
    }, 3000);
  };

  // Handle toggling notification settings
  const toggleNotifications = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  // Add mock notifications at intervals
  useEffect(() => {
    if (!notificationEnabled) return;

    const interval = setInterval(() => {
      generateNotification();
    }, customInterval * 1000);

    return () => clearInterval(interval);
  }, [customInterval, notificationEnabled]);

  // Initial notification
  useEffect(() => {
    generateNotification();
  }, []);

  return (
    <div className="fun-notifications-container">
      <div className="notifications-header">
        <h2>
          <span className="notification-icon">🔔</span>
          Task Reminders
          <span className="notification-icon">📝</span>
        </h2>
        <div className="notification-controls">
          <button
            className="controls-toggle"
            onClick={() => setShowControls(!showControls)}
          >
            ⚙️ Settings
          </button>
          {showControls && (
            <div className="controls-panel">
              <div className="control-group">
                <label>Notification Frequency:</label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={customInterval}
                    onChange={(e) =>
                      setCustomInterval(parseInt(e.target.value))
                    }
                  />
                  <span className="slider-value">{customInterval} seconds</span>
                </div>
              </div>
              <div className="control-group">
                <label>Enable Notifications:</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notificationEnabled}
                    onChange={toggleNotifications}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <button
                className="generate-button"
                onClick={generateNotification}
              >
                Generate Now
              </button>
            </div>
          )}
        </div>
      </div>

      {dismissMessage && (
        <div className="dismiss-message">
          <p>{dismissMessage}</p>
        </div>
      )}

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="empty-notifications">
            <p>No notifications yet. Enjoy the peace while it lasts...</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-card ${notification.type}`}
            >
              <div className="notification-icon">{notification.icon}</div>
              <div className="notification-content">
                <div className="notification-title">{notification.title}</div>
                <div className="notification-message">
                  {notification.message}
                </div>
                <div className="notification-timestamp">
                  {notification.timestamp}
                </div>
              </div>
              <button
                className="dismiss-button"
                onClick={() => dismissNotification(notification.id)}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      {notificationEnabled ? (
        <div className="notification-status enabled">
          <span className="status-icon">✅</span> Procrastination enablement
          active
        </div>
      ) : (
        <div className="notification-status disabled">
          <span className="status-icon">⛔</span> Notifications paused (being
          productive?)
        </div>
      )}
    </div>
  );
}

export default FunNotifications;
