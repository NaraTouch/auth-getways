require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const {ValidationError} = require('express-validation');

const auth = require("./middleware/auth");
const userRoutes = require('./routes/usersRoutes');
const verifyAuth = require('./routes/authRoutes');
const Resp = require("./model/responseModel");

const app = express();

app.use(express.json({ limit: "50mb" }));

app.use("/user", userRoutes);
app.use("/auth", auth, verifyAuth);
app.use("*", (req, res) => {
  return res
      .status(404)
      .send(Resp.error(Resp.msg_not_found(), res.statusCode)
  );
});
app.use(
    function(err, req, res, next) {
      if (err instanceof ValidationError) {
        const error = err.details.body;
        return res
            .status(err.statusCode)
            .send(Resp.error(err.message, res.statusCode, error)
        );
    }
  return res
    .status(500)
    .send(Resp.error(Resp.msg_server_error(), res.statusCode))
});

module.exports = app;