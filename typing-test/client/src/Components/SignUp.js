import "./SignUp.css";
import React, { useState, useRef } from "react";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [errorMessage, setErrorMessage] = useState(""); 
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);
  const confirmPasswordRef = useRef(null);

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

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);

    if(confirmPassword !== password) {
      setErrorMessage("Passwords do not match")
      return
    }

    if (username === "" && password === "") {
      alert("Enter an email and password");
    } else if (username === "") {
      alert("Enter an email");
    } else if (password === "") {
      alert("Enter a password");
    } else if (confirmPassword === "") {
      alert("Confirm your password")
    }
    else {
      const userData = { username, password, confirmPassword };
      try {
        const response = await fetch("http://localhost:3001/create-account", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json(); 
        console.log("Response data:", data);

        if (response.ok) {
          console.log("Signed in as", data.username); // Should log username if successful

          // changing url and then reloading
          window.history.replaceState(null, "", "http://localhost:3001");
          window.location.reload();
          setErrorMessage(""); 
        } else {
          console.error("Error response:", response);
        }

    
        if (data.error) {
          if (data.error === "User exists") {
            setErrorMessage("That user already exists");
          } else if (data.error === "Incorrect password") {
            setErrorMessage("The password you entered is incorrect");
          }
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <span className="login-sign-in-text">
          <strong>Create Account</strong>
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
        <div className="login-password-container">
          <input
            ref={confirmPasswordRef}
            type={inputType}
            placeholder="Confirm password"
            className="login-password-input login-inputs"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          ></input>
          <button className="login-button" onClick={showPassword}>
            {inputType === "password" ? "Show" : "Hide"}
          </button>
        </div>
        <p className="error-message">{errorMessage}</p>

        <button
          className="login-sign-in-button login-button"
          onClick={handleSubmit}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default SignUp;
