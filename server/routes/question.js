const express = require('express');
const router = express.Router();
const { getDB,connectDB } = require('../utils/dbConnect'); 
const { ObjectId } = require('mongodb');

router.get('/challenges', async (req, res) => {
  try {
    const userId = req.headers['token'];
    let db = getDB();
    if(db){}
    else{
      connectDB();
      db = getDB();
    }
    const userExists = await db.collection('auth').findOne({ userId: userId });
    if(userExists){
    const events = await db.collection('events')
      .find()
      .toArray();
      console.log(events[0]._id)
      const questions = await db.collection('challenges').find({event_id:events[0]._id}).toArray();
    res.json(questions);
    }
    else{
      res.status(401).json({error:"user not validated"})
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a question by ID
router.get('/challenges/:id', async (req, res) => {
  try {
    const userId = req.headers['token'];
    let db = getDB();
    if(db){}
    else{
      connectDB();
      db = getDB();
    }
    const userExixts = await db.collection('auth')
    .findOne({userId: new ObjectId(userId)})
    if(userExixts){
    const questionId = req.params.id;
    const question = await db.collection('events').findOne({ _id: new ObjectId(questionId) });

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

router.get('/verify/:id', async (req, res) => {
  try {
    const userId = req.headers['token'];
    let db = getDB();
    if(db){}
    else{
      connectDB();
      db = getDB();
    }
    const userExixts = await db.collection('auth')
    .findOne({userId: userId})
    if(userExixts){
    const questionId = req.body.id;
    const answer = req.body.flag;
    const question = await db.collection('challenges').findOne({ _id: new ObjectId(questionId) });
    if (question && answer && question.flag===answer){
      return res.status(202).json({message:'Hooray Correct Answer'})
    }else {
      return res.status(404).json({ error: 'question not found' });
    }
  }else{
    res.status(401).json({message : 'user not validated'})
  }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'An error occurred while fetching the question' });
  }
});

module.exports = router;
