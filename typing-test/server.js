require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // For hashing passwords

const app = express();
const port = process.env.PORT || 3001;
const password = process.env.PASSWORD;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "typingtest",
  password: password,
  port: 5432,
});

// POST route for adding user (and for login purposes)
app.post("/add-user", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    // Query the database for the user with the given username
    const result = await pool.query(
      "SELECT username, password FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      // If the username doesn't exist in the database
      return res.status(401).json({ error: "Non-existent username" });
    }

    const dbPassword = result.rows[0].password;

    // Use bcrypt to compare the entered password with the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, dbPassword);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    res.status(200).json({
      username: result.rows[0].username,
      message: "Successfully logged in!",
    });
  } catch (error) {
    console.error("Error handling user login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Connect to PostgreSQL database
pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.log("Connection error", err.stack));

// Serve the frontend React app
const path = require("path");
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
