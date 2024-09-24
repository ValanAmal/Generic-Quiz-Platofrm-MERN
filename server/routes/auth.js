const express = require('express');
const router = express.Router();
const { getDB,connectDB } = require('../utils/dbConnect'); 

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
      let db = getDB();
      if(db){}
      else{
        connectDB();
        db = getDB();
      }
      const user = await db.collection('auth').findOne({ email: email });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const isAdmin = user.admin === 1;
  
      res.json({
        message: 'Login successful',
        userId: user._id,
        admin: isAdmin
      });
    } catch (err) {
      console.error('Error logging in', err);
      res.status(500).json({ error: 'An error occurred while logging in' });
    }
  });
  
module.exports = router;