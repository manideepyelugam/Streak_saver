// server/index.js
require("dotenv").config(); // <-- Load env first
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const githubOAuthRoutes = require("./routes/githubOAuth.route");
const loginLogoutRoutes = require("./routes/login.logout.route");
const startScheduleRoute = require('./routes/startSchedule.route');

const port = process.env.PORT || 5000;

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



app.get("/", (req, res) => {
  res.send("Welcome to the Streak Saver API");
});


app.listen(port, () => console.log(`Server running on ${port}`));
