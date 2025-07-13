
require("dotenv").config(); 
const express = require('express');
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");
const { encrypt } = require("../utils/encryption");



const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";



//Github redirection route
router.get('/github', (req, res) => {
  const redirect = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,user`;
  res.redirect(redirect);
});




//Github callback route
router.get("/github/callback", async (req, res) => {
    const { code } = req.query;
  
    try {
      // Exchange code for access token
      const tokenRes = await axios.post(
        `https://github.com/login/oauth/access_token`,
        {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
        },
        {
          headers: { Accept: "application/json" },
        }
      );
  
      const access_token = tokenRes.data.access_token;
  
      console.log(access_token)
      const encryptedToken = encrypt(access_token);
  
      // Fetch user profile
      const userRes = await axios.get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
  
      const profile = userRes.data;
  
      // Save or update user in DB
      const user = await User.findOneAndUpdate(
        { githubId: profile.id },
        {
          githubId: profile.id,
          login: profile.login,
          name: profile.name,
          avatarUrl: profile.avatar_url,
          accessToken: encryptedToken,
        },
        { upsert: true, new: true }
      );
  
      // Redirect to frontend with token (optionally, use JWT or cookies)
      res.redirect(`${FRONTEND_URL}/dashboard?login=${user.login}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Authentication failed");
    }
  });
  


module.exports = router;