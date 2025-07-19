require("dotenv").config();
const express = require('express');
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");
const Streak = require("../models/Streak");
const { decrypt } = require("../utils/encryption");

// --- POST: Start Streak ---
router.post("/:login", async (req, res) => {

  try {
    const user = await User.findOne({ login: req.params.login });
    if (!user) return res.status(404).json("Invalid user");

    const GITHUB_TOKEN = decrypt(user.accessToken);
    const GITHUB_API = `https://api.github.com/repos/${req.params.login}/auto_commit`;

    try {
      await axios.get(GITHUB_API, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
      });
    } catch (err) {
      console.log(err)
        return res.json("Please create a repo named 'auto_commit'");
      
      
    }


    const now = new Date()
    let streak = await Streak.findOne({ userId: user.githubId });
    const expiry = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000);

  
    if (!streak) {
      streak = await Streak.create({
        userId: user.githubId,
        startedAt: now,
        expiresAt: expiry,
        daysCompleted: 0,
        active: true,
        commits: [],
      });
    } else {


      if(streak.active){
        return res.json("job already in progress")
  }else{
    streak.startedAt = now;
    streak.expiresAt = expiry;
    streak.active = true;
    await streak.save();
  }

      
    }
  
    return res.json("Streak started and marked active");
  } catch (error) {
    console.error(error);
    res.status(500).json("Failed to start streak");
  }
  
});

// --- POST: Stop Streak ---
router.post("/stop/:login", async (req, res) => {
  try {
    const user = await User.findOne({ login: req.params.login });
    if (!user) return res.status(404).json("Invalid user");

    const streak = await Streak.findOne({ userId: user.githubId });
    if (!streak) return res.status(404).json("No streak found");

    if(!streak.active){
      return res.json("No streak saver running")
    }

    streak.active = false;
    await streak.save();

    res.json("Streak saver stopped");
  } catch (error) {
    console.error(error);
    res.status(500).json("Failed to stop streak");
  }
});

// --- GET: Manual Commit for a User ---
router.get("/commit/:login", async (req, res) => {
  try {
    const user = await User.findOne({ login: req.params.login });
    if (!user) return res.status(404).json("Invalid user");

    const streak = await Streak.findOne({ userId: user.githubId, active: true });
    if (!streak) return res.status(400).json("Streak not active");

    await commitToGitHub(user, streak);
    res.json("Committed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Commit failed");
  }
});

// --- GET: Commit for All Active Users ---
router.get("/run-all-jobs", async (req, res) => {
  try {
    const now = new Date();
    const streaks = await Streak.find({ active: true,expiresAt: { $gt: now } });
    for (const streak of streaks) {
      const user = await User.findOne({ githubId: streak.userId });
      if (!user) {
        console.log(`User not found for ${streak.userId}`);
        continue;
      }
      await commitToGitHub(user, streak);
    }
    res.json("Triggered commits for all active users");
  } catch (error) {
    console.error(error);
    res.status(500).json("Failed to trigger commits");
  }
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




// --- Commit Logic ---
async function commitToGitHub(user, streak) {
  const GITHUB_TOKEN = decrypt(user.accessToken);
  const REPO_OWNER = user.login;
  const REPO_NAME = 'auto_commit';
  const BRANCH = 'main';
  const FILE_PATH = 'dummy.txt';
  const GITHUB_API = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;

  

  try {
    // Get SHA if file exists
    let sha = null;
    try {
      const res = await axios.get(`${GITHUB_API}/contents/${FILE_PATH}?ref=${BRANCH}`, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
      });
      sha = res.data.sha;
    } catch (err) {
      if (err.response?.status === 404) console.log('File not found. It will be created.');
    }

    // Commit to GitHub
    const timestamp = new Date().toISOString();
    const content = Buffer.from(`Updated at ${timestamp}\n`).toString('base64');
    await axios.put(`${GITHUB_API}/contents/${FILE_PATH}`, {
      message: `Auto commit at ${timestamp}`,
      content,
      branch: BRANCH,
      sha,
    }, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      }
    });

    // Update streak DB
    streak.daysCompleted += 1;
    streak.commits.push({ timestamp, commitMessage: `Auto commit at ${timestamp}` });
    await streak.save();
    console.log(`✅ Committed for ${user.login}`);
  } catch (err) {
    console.error(`❌ Commit failed for ${user.login}:`, err.response?.data || err.message);
  }
}

module.exports = router;
