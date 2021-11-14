require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const {ValidationError} = require('express-validation');

const auth = require("./middleware/auth");
const userRoutes = require('./routes/usersRoutes');
const verifyAuth = require('./routes/authRoutes');

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use("/user", userRoutes);

app.use("/auth", auth, verifyAuth);

app.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }
  return res.status(500).json(err)
})

// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: "false",
//     message: "Page not found",
//     error: {
//       statusCode: 404,
//       message: "You reached a route that is not defined on this server",
//     },
//   });
// });

module.exports = app;