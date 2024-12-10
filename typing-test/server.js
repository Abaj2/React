require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;
const password = process.env.PASSWORD;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "typingtest",
  password: password,
  port: 5432,
});

app.post("/add-user", async (req, res) => {
  const { username, password } = req.body;
  console.log("Received data on server:", req.body); // Log the data received

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const result = await pool.query(
      "SELECT username FROM users WHERE username = $1",
      [username]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting user into database:", error);
    res.status(500).json({ error: "Error inserting user into database" });
  }
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.log("Connection error", err.stack));

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
