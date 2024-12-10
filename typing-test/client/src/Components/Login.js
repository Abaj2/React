import "./Login.css";
import React, { useState, useEffect, useRef } from "react";

function Login() {
  const [inputType, setInputType] = useState("password");
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const showPassword = () => {
    if (inputType === "password") {
      setInputType("text");
    } else if (inputType === "text") {
      setInputType("password");
    }
  };
  const signIn = () => {
    if (passwordRef.current.value === "" && emailRef.current.value === "") {
      alert("Enter an email and password");
    } else if (emailRef.current.value === "") {
      alert("Enter an email");
    } else if (passwordRef.current.value === "") {
      alert("Enter a password");
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