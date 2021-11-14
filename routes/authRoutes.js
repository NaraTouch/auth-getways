const express = require('express');
const router = express.Router();

const auth = require('../controllers/verifyAuthController');

router.get("/verify", auth.verifyAuth);

module.exports = router;