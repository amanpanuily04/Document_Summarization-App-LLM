import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import FileUpload from "./components/FileUpload";
import SummaryResult from "./components/SummaryResult";
import "./App.css";

function BackgroundUpdater() {
  const location = useLocation();

  useEffect(() => {
    document.body.className = ""; // Reset body class
    if (location.pathname === "/") {
      document.body.classList.add("body-home");
    } else if (location.pathname === "/upload") {
      document.body.classList.add("body-upload");
    } else if (location.pathname === "/summary") {
      document.body.classList.add("body-summary");
    }
  }, [location.pathname]);

  return null; // This component does not render anything
}

function App() {
  return (
    <Router>
      <BackgroundUpdater /> {/* This will update the background based on the route */}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/summary" element={<SummaryResult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
