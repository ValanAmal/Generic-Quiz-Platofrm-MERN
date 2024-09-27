const express = require('express');
const router = express.Router();
const { getDB,connectDB } = require('../utils/dbConnect'); 
const { ObjectId } = require('mongodb');


router.get('/leadaerboard/:id', async (req, res) => {
    try {
      const userId = req.headers['token'];
      let db = getDB();
      if(db){}
      else{
        connectDB();
        db = getDB();
      }
      const userExists = await db.collection('auth').findOne({ _id: new ObjectId(userId) });
      if(userExists){
        const question = await db.collection('challenges').findOne({ _id: new ObjectId(questionId) });
        if (!question) {
            return res.status(404).json({ error: 'question not found' });
        }
  
      res.json(question);
    }else{
      res.status(401).json({message : 'user not validated'})
    }
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'An error occurred while fetching the question' });
    }
  });

  module.exports = router;