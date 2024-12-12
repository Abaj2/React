import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import TypingTest from "./Components/TypingTest";
import SignUp from "./Components/SignUp";
import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { UsernameProvider } from "./Components/UsernameContext";

function App() {
  return (
    <UsernameProvider>
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
          <Route
            path="/create-account"
            element={
              <div className="login">
                <SignUp />
              </div>
            }
          />
        </Routes>
      </Router>
    </UsernameProvider>
  );
}

export default App;