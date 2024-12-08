import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import TypingTest from "./Components/TypingTest";
import React from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="typing-test">
              <TypingTest />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="login">
              <Login />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
