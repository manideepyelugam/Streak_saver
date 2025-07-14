require("dotenv").config(); 
const express = require('express');
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");
const { decrypt } = require("../utils/encryption");
const cron = require('node-cron');
const Streak = require('../models/Streak');



const scheduledUsers = new Set(); //  Track already scheduled users

router.post('/:login', async (req, res) => {
  const user = await User.findOne({ login: req.params.login });
  if (!user) return res.status(404).json("Invalid user");



  const Streakk = await Streak.create({
    userId : user.githubId,
    startedAt : Date.now(),
    expiresAt : Date.now()+ 15 * 24 * 60 * 60 * 1000,
    daysCompleted : 0,
    active : true
  })

  Streakk.save();


  const login = user.login;


  // Avoid scheduling cron multiple times for same user
  if (scheduledUsers.has(login)) {
    return res.json("Cron job already running for this user");
  }

  const GITHUB_TOKEN = decrypt(user.accessToken);
  const REPO_OWNER = user.login;
  const REPO_NAME = 'auto_commit';
  const BRANCH = 'main';
  const FILE_PATH = 'dummy.txt';
  const GITHUB_API = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;



  async function getFileSHA() {
    try {
      const res = await axios.get(`${GITHUB_API}/contents/${FILE_PATH}?ref=${BRANCH}`, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
      });
      return res.data.sha;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(' File does not exist yet. Creating new file.');
        return null;
      }
      console.error('Failed to fetch file metadata:', error.response?.data || error.message);
      throw error;
    }
  }

  async function commitToGitHub() {
    try {
      const sha = await getFileSHA();
      const timestamp = new Date().toISOString();
      const content = Buffer.from(`Updated at ${timestamp}\n`).toString('base64');

      await axios.put(
        `${GITHUB_API}/contents/${FILE_PATH}`,
        {
          message: `Auto commit at ${timestamp}`,
          content: content,
          branch: BRANCH,
          sha: sha,
        },
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github+json',
          },
        }
      );

      const streak = await Streak.findOne({ userId: user.githubId });
      if (streak) {
        streak.daysCompleted += 1;
      
        // To add a commit timestamp
        streak.commitTimestamps.push(timestamp);
      
        await streak.save();
      }

      console.log(`[+] ${login}: Committed at ${timestamp}`);
    } catch (err) {
      console.error(`[-] ${login}: Commit failed:`, err.response?.data || err.message);
    }
  }

  // Schedule the cron job only once
  cron.schedule('*/5 * * * *', commitToGitHub);
  scheduledUsers.add(login); // Mark this user as scheduled

  res.json("Cron job scheduled for user: " + login);
});



router.get("/:login/getUpdates", async(req,res) => {
    try{

        const user = await User.findOne({ login: req.params.login });
        if (!user) return res.status(404).json("Invalid user");
    
        const Streakk = await Streak.findOne({userId : user.githubId});
        res.json(Streakk)


    }catch(e){

        console.log(e);
        res.json(e)

    }
   
})

module.exports = router;
