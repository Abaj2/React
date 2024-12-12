import "./Login.css";
import React, { useState, useRef, useContext } from "react";
import { UsernameContext } from "./UsernameContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  // Destructure setFinalUsername from context
  const { setFinalUsername } = useContext(UsernameContext);

  const showPassword = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username === "" && password === "") {
      alert("Enter an email and password");
      return;
    } else if (username === "") {
      alert("Enter an email");
      return;
    } else if (password === "") {
      alert("Enter a password");
      return;
    }

    const userData = { username, password };
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        const userUsername = data.username;
        setFinalUsername(userUsername);
        window.history.replaceState(null, "", "http://localhost:3001");
        window.location.reload();
        setErrorMessage("");
      } else {
        console.error("Error response:", response);
        if (data.error) {
          if (data.error === "Non-existent username") {
            setErrorMessage("That username doesn't exist");
          } else if (data.error === "Incorrect password") {
            setErrorMessage("The password you entered is incorrect");
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <span className="login-sign-in-text">
          <strong>Sign in</strong>
        </span>
        <input
          ref={usernameRef}
          type="text"
          placeholder="Username"
          className="login-email-input login-inputs"
          value={username}
          onChange={handleUsernameChange}
        />
        <div className="login-password-container">
          <input
            ref={passwordRef}
            type={inputType}
            placeholder="Password"
            className="login-password-input login-inputs"
            value={password}
            onChange={handlePasswordChange}
          />
          <button className="login-button" onClick={showPassword}>
            {inputType === "password" ? "Show" : "Hide"}
          </button>
        </div>

        <p className="error-message">{errorMessage}</p>

        <button
          className="login-sign-in-button login-button"
          onClick={handleSubmit}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default Login;