const express = require('express');
const router = express.Router();
const { getDB,connectDB } = require('../utils/dbConnect'); 
const { ObjectId } = require('mongodb');


router.get('/leaderboard', async (req, res) => {
    try {
      const db = getDB(); // Get your MongoDB connection
  
      // Fetch leaderboard data
      const leaderboard = await db.collection('leaderboard').findOne({});
      
      if (!leaderboard) {
        return res.status(404).json({ message: 'Leaderboard not found' });
      }
  
      // Get userIds from leaderboard participants
      const userIds = leaderboard.participants.map(participant => new ObjectId(participant.userId));
  
      // Fetch user emails from the auth collection based on userIds
      const users = await db.collection('auth').find({ _id: { $in: userIds } }).toArray();
  
      // Map userId to email for quick lookup
      const userEmailMap = users.reduce((acc, user) => {
        acc[user._id.toString()] = user.email;
        return acc;
      }, {});
  
      // Combine leaderboard data with user emails
      const leaderboardWithEmails = leaderboard.participants.map(participant => ({
        userId: participant.userId,
        score: participant.score,
        email: userEmailMap[participant.userId] || 'Email not found',
      }));
  
      // Send the response to the frontend
      res.status(200).json(leaderboardWithEmails);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  module.exports = router;