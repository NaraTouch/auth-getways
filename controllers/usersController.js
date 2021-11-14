const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/userModel");
const BlackList = require("../model/blackListModel");
const Resp = require("../model/responseModel");

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const ex_token = user.token;
    const compare = await bcrypt.compare(password, user.password);
    if (ex_token) {
        await BlackList.create({
            user_id: user._id,
            token: user.token,
        });
    }
    if (user && compare) {
        const cr_user = {user_id: user._id, email: email};
        const token_key = process.env.TOKEN_KEY;
        const expired = {expiresIn: "2h"};
        const n_token = jwt.sign(cr_user,token_key,expired);
        user.token = n_token;
        await user.save();
        return res
            .status(200)
            .send(Resp.success(Resp.msg_success(), res.statusCode, {token: n_token}));
    }
    return res
        .status(400)
        .send(Resp.error(Resp.msg_wrong_pass_user(), res.statusCode)
    );
}

const register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const existing = await User.findOne({ email });

    if (existing) {
        return res
            .status(409)
            .send(
                Resp.error("User "+Resp.msg_invalid_cred()+" Please login.",
                res.statusCode)
            );
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,
    });
    return res
        .status(200)
        .send(Resp.success(Resp.msg_success(), res.statusCode, user));
}

module.exports = {
    login,
    register
}