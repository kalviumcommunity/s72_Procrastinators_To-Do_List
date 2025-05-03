import React from "react";
import "./App.css";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Landing />
    </div>
  );
}

export default App;
