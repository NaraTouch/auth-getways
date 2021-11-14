const express = require('express');
const router = express.Router();
const { validate } = require('express-validation');

const userController = require('../controllers/usersController');
const { loginValidation, registerValidation } = require("../validator/userValdator");

router.post("/register", validate(registerValidation, {}, {}), userController.register);
router.post("/login", validate(loginValidation, {}, {}), userController.login);

module.exports = router;