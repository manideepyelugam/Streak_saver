const mongoose = require("mongoose");

const streakSchema = new mongoose.Schema({

        userId: mongoose.Schema.Types.ObjectId,
        startedAt: Date,
        expiresAt: Date,
        daysCompleted: Number,
        active: Boolean
      
      
})


const Streak = mongoose.model("Streak", streakSchema);

module.exports = Streak;