/* C:\Users\Admin-User\Documents\Code\React\Password-strength-checker */
import React, { useState } from "react";
import validator from "validator";

function App() {
  const [validatorMessage, setValidatorMessage] = useState("");

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 1,
        minUppercase: 1,
      })
    ) {
      setValidatorMessage("Password is strong");
    } else {
      setValidatorMessage("Password is not strong enough");
    }
  };
  return (
    <body style={{ backgroundColor: "#003B46", textAlign: "center" }}>
      <div>
        <h1>Password strength checker</h1>
        <div>
          <span>Enter password: </span>
          <input
            type="text"
            onChange={(e) => validate(e.target.value)}
          ></input>{" "}
          <br />
          {validatorMessage === "Password is strong" ? (
            <span style={{ color: "green" }}>{validatorMessage}</span>
          ) : (
            <span style={{ color: "red" }}>{validatorMessage}</span>
          )}
        </div>
      </div>
    </body>
  );
}
export default App;
