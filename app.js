require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const auth = require("./middleware/auth");
const userRoutes = require('./routes/usersRoutes');

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use("/user", userRoutes);

app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

module.exports = app;