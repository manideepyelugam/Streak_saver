const mongoose = require("mongoose");

const streakSchema = new mongoose.Schema({
  userId: Number,
  startedAt: Date,
  expiresAt: Date,
  daysCompleted: Number,
  active: Boolean,

  commitTimestamps: [String],
}, {
  timestamps: true, // adds createdAt, updatedAt
});

const Streak = mongoose.model("Streak", streakSchema);
module.exports = Streak;
