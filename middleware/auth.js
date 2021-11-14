const jwt = require("jsonwebtoken");
const config = process.env;

const BlackList = require("../model/blackListModel");

const verifyToken = async (req, res, next) => {
  
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  const o_token = await BlackList.findOne({ token });
  if (o_token) {
    return res.status(403).send("Your token has been locked");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;