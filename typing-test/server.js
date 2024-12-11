require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;
const postgresPassword = process.env.PASSWORD;

app.use(express.json());
app.use(cors());

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "typingtest",
  password: postgresPassword,
  port: 5432,
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL database successfully."))
  .catch((err) =>
    console.error("Failed to connect to the PostgreSQL database:", err)
  );

// POST route for login validation
// POST route for login validation
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query the database for the user with the given username
    const usernamePasswordResult = await pool.query(
      "SELECT username, password FROM users WHERE username = $1",
      [username]
    );

    if (usernamePasswordResult.rows.length === 0) {
      console.error("Username does not exist:", username);
      return res.status(401).json({ error: "Non-existent username" });
    }
    // Check if the password matches (simple comparison for demo, should hash in production)
    if (password !== usernamePasswordResult.rows[0].password) {
      console.error("Incorrect password for username:", username);
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Send back the username as part of the response
    res.status(200).json({
      username: usernamePasswordResult.rows[0].username,
      password: usernamePasswordResult.rows[0].password,
      message: "users username",
    });
  } catch (error) {
    console.error("Error handling user login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/create-account", async (req, res) => {
  try {
  const { username, password } = req.body;

  const checkUserExistence = await pool.query(
    "SELECT username FROM users WHERE username = $1",
    [username]
  );

  if (checkUserExistence.rows.length > 0) {
    console.error("User already exists:", username);
    return res.status(401).json({ error: "User exists" });
  }


  const createUser = await pool.query(
    "INSERT INTO users(username, password) values($1, $2)",
    [username, password]);

  newUser = await pool.query (
    "SELECT username, password FROM users WHERE username = $1",
    [username]
  )
  if (password !== newUser.rows[0].password) {
    console.error("Incorrect password for username:", username)
    return res.status(401).json({ error: "Incorrect password" })
  }

    res.status(200).json({
      username: newUser.rows[0].username,
      password: newUser.rows[0].password,
      message: "new user",
});
} catch (error) {
  console.error("Error handling user sign up:", error);
  res.status(500).json({ error: "Internal server error" });
}
});


// Serve static files
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
