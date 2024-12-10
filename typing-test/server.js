require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;
const password = process.env.PASSWORD;

app.use(express.json());
app.use(corse());
app.use(express.urlencoded({ extended: true }));

const pool = new pool({
  user: "postgres",
  host: `localhost`,
  database: "typingtest",
  password: password,
  port: port,
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
