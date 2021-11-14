const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const login = async (req, res) => {
    
    try {
        const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const cr_user = {user_id: user._id, email: email};
        const token_key = process.env.TOKEN_KEY;
        const expired = {expiresIn: "2h"};
        const token = jwt.sign(cr_user,token_key,expired);
        user.token = token;
        res.status(200).json(user);
    }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
}

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res
                .status(409)
                .send("User Already Exist. Please Login");
        }
        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    login,
    register
}