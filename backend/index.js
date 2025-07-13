// server/index.js
require("dotenv").config(); // <-- Load env first
const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const { encrypt } = require("./utils/encryption");
const { decrypt } = require("./utils/encryption");
const Streak = require("./models/Streak");
const githubOAuthRoutes = require("./routes/githubOAuth.route");
const loginLogoutRoutes = require("./routes/login.logout.route");
const startScheduleRoute = require('./routes/startSchedule.route');

const app = express();
app.use(cors());
app.use(express.json());




// Connect to MongoDB
//console.log(CLIENT_ID,CLIENT_SECRET,FRONTEND_URL)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {console.log('MongoDB connected successfully') 
    })
  .catch(err => console.error('MongoDB  connection error:', err));


app.use("/auth", githubOAuthRoutes);
app.use("/api", loginLogoutRoutes);
app.use("/start",startScheduleRoute)




  app.post("/api/start-streak", async (req, res) => {
    const { userId } = req.user; // From session/JWT
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).send("User not found");
    }

    const streak = await Streak.create({
      userId,
      startedAt: new Date(),
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      daysCompleted: 0,
      active: true
    });
  
    res.json({ message: "✅ 15-day streak started", streak });
  })


app.listen(5000, () => console.log("Server running on http://localhost:5000"));
