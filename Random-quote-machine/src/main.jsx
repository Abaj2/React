import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client"; // for React 18 and later
import App from "./App"; // Import the main App component
import "./index.css"; // Import global CSS (optional)

const root = ReactDOM.createRoot(document.getElementById("root")); // Create a root element for React

root.render(
  <StrictMode>
    <App /> {/* Render your App component inside StrictMode */}
  </StrictMode>
);
