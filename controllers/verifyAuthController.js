const BlackList = require("../model/blackListModel");
const auth = require("../middleware/auth");

const verifyAuth = async (req, res) => {
    return res.status(200).send("Welcome 🙌 ");
}

module.exports = {
    verifyAuth
}