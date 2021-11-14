const jwt = require("jsonwebtoken");
const config = process.env;

const BlackList = require("../model/blackListModel");
const Resp = require("../model/responseModel");

const verifyToken = async (req, res, next) => {
  
  const token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(403)
      .send(Resp.error("Token is "+Resp.msg_required(), res.statusCode));
  }
  const o_token = await BlackList.findOne({ token });
  if (o_token) {
    const message = "Your token has been locked. Please login again.";
    return res
      .status(403)
      .send(Resp.error(message, res.statusCode));
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res
      .status(401)
      .send(Resp.error(Resp.msg_invalid_cred(), res.statusCode));
  }
  return next();
};

module.exports = verifyToken;