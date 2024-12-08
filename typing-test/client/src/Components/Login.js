import './Login.css'
import React, { useState, useEffect, useRef } from "react";

function Login() {
  return (
    <div className="login">
      <div className="login-container">
        <span className ='login-sign-in-text'>
          <strong>Sign in</strong>
        </span>
        <input type="text" placeholder="Email" className="login-email-input login-inputs"></input>
        <div className="login-password-container">
          <input
            type="password"
            placeholder="Password"
            className="login-password-input login-inputs"
          ></input>
          <button className='login-button'>Show</button>
        </div>
        <button className='login-sign-in-button login-button'>Sign in</button>
      </div>
    </div>
  );
}
export default Login;
