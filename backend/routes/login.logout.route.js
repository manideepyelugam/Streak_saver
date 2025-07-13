const express = require("express"); 
const router = express.Router();
const User = require("../models/User");



//Github user profile route
router.get("/users/:login", async (req, res) => {
    const user = await User.findOne({ login: req.params.login });
    if (!user) return res.status(404).send("User not found");
    res.json({ login: user.login, name: user.name, avatar: user.avatarUrl });
  });
  
  
  //Github logout route
  router.get("/users/logout/:name", async (req, res) => {
    const userName = req.params.name;
  
    try {
      const user = await User.findOneAndDelete({ login: userName });
  
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      return res.json("Successful");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  });

module.exports = router;
  