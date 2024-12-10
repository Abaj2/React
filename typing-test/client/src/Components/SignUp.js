import "./SignUp.css";
import React, { useState, useEffect, useRef } from "react";

function Login() {
  const [inputType, setInputType] = useState("password");
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const showPassword = () => {
    if (inputType === "password") {
      setInputType("text");
    } else if (inputType === "text") {
      setInputType("password");
    }
  };
  const signIn = () => {
    if (
      confirmPasswordRef.current.value ||
      emailRef.current.value ||
      passwordRef.current.value === ""
    ) {
      alert("Please fill in all sections");
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Passwords do not match");
      return;
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        <span className="login-sign-in-text">
          <strong>Sign in</strong>
        </span>
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          className="login-email-input login-inputs"
        ></input>
        <div className="login-password-container">
          <input
            ref={passwordRef}
            type={inputType}
            placeholder="Password"
            className="login-password-input login-inputs"
          ></input>
          <input
            ref={confirmPasswordRef}
            type={inputType}
            placeholder="Password"
            className="login-password-input login-inputs"
          ></input>
          <button className="login-button" onClick={showPassword}>
            {inputType === "password" ? "Show" : "Hide"}
          </button>
        </div>

        <button className="login-sign-in-button login-button" onClick={signIn}>
          Sign in
        </button>
      </div>
    </div>
  );
}
export default Login;
