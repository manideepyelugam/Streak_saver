const mongoose = require("mongoose");

const streakSchema = new mongoose.Schema({
  userId:  { type: Number, unique: true },
  startedAt: Date,
  expiresAt: Date,
  daysCompleted: Number,
  active: Boolean,

  commits: [{
    timestamp: Date,
    commitMessage: String
  
  }]}, {
  timestamps: true, // adds createdAt, updatedAt
});

const Streak = mongoose.model("Streak", streakSchema);
module.exports = Streak;
