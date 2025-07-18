// require("dotenv").config(); 
// const express = require('express');
// const router = express.Router();
// const axios = require("axios");
// const User = require("../models/User");
// const { decrypt } = require("../utils/encryption");
// const cron = require('node-cron');
// const Streak = require('../models/Streak');



// const scheduledUsers = new Map(); //  Track already scheduled users

// router.post('/:login', async (req, res) => {
//   const user = await User.findOne({ login: req.params.login });
//   if (!user) return res.status(404).json("Invalid user");



//   let Streakk = await Streak.findOne({ userId: user.githubId });

//   if (!Streakk) {
//     Streakk = await Streak.create({
//       userId: user.githubId,
//       startedAt: Date.now(),
//       expiresAt: Date.now() + 15 * 24 * 60 * 60 * 1000,
//       daysCompleted: 0,
//       active: true,
//       commits: []  // initialize commits array
//     });
//   }else{
//     Streakk.startedAt = new Date();
//     Streakk.expiresAt = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
//     Streakk.active = "true"
//     await Streakk.save();
//   }

//   const login = user.login;


//   // Avoid scheduling cron multiple times for same user
//   if (scheduledUsers.has(login)) {
//     return res.json("Cron job already running for this user");
//   }

//   const GITHUB_TOKEN = decrypt(user.accessToken);
//   const REPO_OWNER = user.login;
//   const REPO_NAME = 'auto_commit';
//   const BRANCH = 'main';
//   const FILE_PATH = 'dummy.txt';
//   const GITHUB_API = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;



//   async function getFileSHA() {
//     try {
//       const res = await axios.get(`${GITHUB_API}/contents/${FILE_PATH}?ref=${BRANCH}`, {
//         headers: {
//           Authorization: `Bearer ${GITHUB_TOKEN}`,
//           Accept: 'application/vnd.github+json',
//         },
//       });
//       return res.data.sha;
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         console.log(' File does not exist yet. Creating new file.');
//         return null;
//       }
//       console.error('Failed to fetch file metadata:', error.response?.data || error.message);
//       throw error;
//     }
//   }

//   async function commitToGitHub() {
//     try {
//       const sha = await getFileSHA();
//       const timestamp = new Date().toISOString();
//       const content = Buffer.from(`Updated at ${timestamp}\n`).toString('base64');
//       const streak = await Streak.findOne({ userId: user.githubId });


      
//       await axios.put(
//         `${GITHUB_API}/contents/${FILE_PATH}`,
//         {
//           message: `Auto commit at ${timestamp}`,
//           content: content,
//           branch: BRANCH,
//           sha: sha,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${GITHUB_TOKEN}`,
//             Accept: 'application/vnd.github+json',
//           },
//         }
//       );


//       if (streak) {   
//         streak.daysCompleted += 1,
//         streak.commits.push({
//           timestamp : timestamp,
//           commitMessage : `Auto commit at ${timestamp}`

//         })
//         await streak.save();
//       }

//       console.log(`[+] ${login}: Committed at ${timestamp}`);
//     } catch (err) {
//       console.error(`[-] ${login}: Commit failed:`, err.response?.data || err.message);
//     }
//   }

//   // Schedule the cron job only once
//    const job = cron.schedule('0 * * * *', commitToGitHub);
//   scheduledUsers.set(login,job); // Mark this user as scheduled

//   res.json("Cron job scheduled for user: " + login);
// });



// router.get("/:login/getUpdates", async(req,res) => {
//     try{

//         const user = await User.findOne({ login: req.params.login });
//         if (!user) return res.status(404).json("Invalid user");
    
//         const Streakk = await Streak.findOne({userId : user.githubId});
//         res.json(Streakk)


//     }catch(e){

//         console.log(e);
//         res.json(e)

//     }
   
// })


// router.post("/:login/stop",async (req,res) => {
//   const login = req.params.login;
//   const job = scheduledUsers.get(login);


//   const user = await User.findOne({login : login});
//   if(!user) return res.json("user not found");


//   const streak = await Streak.findOne({userId : user.githubId});

//   if (job) {

//       job.stop();
//       scheduledUsers.delete(login);

//       if(streak){
//             streak.active = "false"
//       }

//       await streak.save();

//       return res.json(`Cron job stopped for ${login}`);
//   } else {
//       return res.status(404).json("No running cron job for this user.");
//   }


// })

// module.exports = router;




require("dotenv").config();
const express = require('express');
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");
const Streak = require("../models/Streak");
const { decrypt } = require("../utils/encryption");

// --- POST: Start Streak ---
router.post("/start/:login", async (req, res) => {
  try {
    const user = await User.findOne({ login: req.params.login });
    if (!user) return res.status(404).json("Invalid user");

    let streak = await Streak.findOne({ userId: user.githubId });
    const now = new Date();
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
      streak.startedAt = now;
      streak.expiresAt = expiry;
      streak.active = true;
      await streak.save();
    }

    res.json("Streak started and marked active");
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

    streak.active = false;
    await streak.save();

    res.json("Streak marked inactive");
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
    const streaks = await Streak.find({ active: true });
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
