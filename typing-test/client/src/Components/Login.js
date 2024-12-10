import "./Login.css";
import React, { useState, useRef } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  const showPassword = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);

    if (username === "" && password === "") {
      alert("Enter an email and password");
    } else if (username === "") {
      alert("Enter an email");
    } else if (password === "") {
      alert("Enter a password");
    } else {
      const userData = { username, password };
      try {
        const response = await fetch("http://localhost:3001/add-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const data = await response.json();
        console.log(data.username);
        console.log(data.password);

        if (data.error) {
          setErrorMessage(data.error); // Set error message if any error is received
        } else {
          console.log("Signed in as", data.username);
        }

        if (!response.ok) {
          console.error("Error signing in:", data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
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
          type="email"
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
        <p className="error-message">
          {errorMessage === "Non-existent username"
            ? "That username doesn't exist"
            : errorMessage === "Incorrect password"
            ? "The password you entered is incorrect"
            : ""}
        </p>
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
