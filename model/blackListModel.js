const mongoose = require("mongoose");

const blackListSchema = new mongoose.Schema({
    user_id: { type: String, default: null },
    token: { type: String, default: null }
});

module.exports = mongoose.model("blacklist", blackListSchema);