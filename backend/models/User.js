// server/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  githubId: String,
  login: String,
  name: String,
  avatarUrl: String,
  accessToken: String,
});

module.exports = mongoose.model("User", userSchema);
