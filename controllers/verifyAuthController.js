const BlackList = require("../model/blackListModel");
const auth = require("../middleware/auth");
const Resp = require("../model/responseModel");

const verifyAuth = async (req, res) => {
    return res
        .status(200)
        .send(Resp.error(Resp.msg_success(), res.statusCode)
    );
}

module.exports = {
    verifyAuth
}