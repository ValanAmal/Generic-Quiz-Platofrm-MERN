const express = require('express');
const router = express.Router();
const { getDB,connectDB } = require('../utils/dbConnect'); 
const { ObjectId } = require('mongodb');

router.get('/challenges', async (req, res) => {
  try {
    const userId = req.headers['token'];
    let db = getDB();
    
    if (!db) {
      connectDB();
      db = getDB();
    }
    console.log(userId)
    const userExists = await db.collection('auth').findOne({ _id: new ObjectId(userId) });
    if (userExists) {
      const completedQuestions = userExists.completed_questions || [];
      const events = await db.collection('events').find().toArray();
      console.log(events[0]._id);
      const questions = await db.collection('challenges').find({ event_id: events[0]._id }).toArray();
      const filteredQuestions = questions.filter(question => !completedQuestions.includes(question._id.toString()));

      res.json(filteredQuestions);
    } else {
      res.status(401).json({ error: "User not validated" });
    }
  } catch (err) {
    console.log(err);
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
    const userExists = await db.collection('auth').findOne({ _id: new ObjectId(userId) });
    console.log(userExists)
    console.log(userId)
    if(userExists){
    const questionId = req.params.id;
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

router.post('/verify/:id', async (req, res) => {
  try {
    const userId = req.headers['token'];
    let db = getDB();

    if (!db) {
      connectDB();
      db = getDB();
    }
    const userExists = await db.collection('auth').findOne({ _id: new ObjectId(userId) });
    if (!userExists) {
      return res.status(401).json({ message: 'User not validated' });
    }
    const questionId = req.params.id;
    const answer = req.body.flag;
    
    const question = await db.collection('challenges').findOne({ _id: new ObjectId(questionId) });
    
    if (!question || question.flag !== answer) {
      return res.status(402).json({ error: 'Question not found or incorrect answer' });
    }

    if (userExists && userExists.completed_questions ) {
      if(userExists.completed_questions.includes(questionId)){
      return res.status(403).json({ message: 'Not allowed: question already completed' });
      }
    }

    await db.collection('auth').updateOne(
      { _id: new ObjectId(userId) },
      { $addToSet: { completed_questions: questionId } }
    );
    const eventId = question.event_id;
    const scoreToAdd = question.points;
    const leaderboardUpdateResult = await db.collection('leaderboard').findOneAndUpdate(
      { event_id: eventId, 'participants.userId': new ObjectId(userId) },
      { 
        $inc: { 'participants.$.score': scoreToAdd }, // Increment existing user's score
      },
      { returnDocument: 'after' }
    );

    try {
      if(!leaderboardUpdateResult.value){}}
    catch(err){
      
      const newLeaderboard = {
        event_id: eventId,
        participants: [{ userId: new ObjectId(userId), score: scoreToAdd }],
        totalScore: scoreToAdd,
      };
      const insertResult = await db.collection('leaderboard').insertOne(newLeaderboard);
      
      if (insertResult.insertedId) {
        return res.status(201).json({ message: 'Leaderboard created and participant added', newScore: scoreToAdd });
      } else {
        return res.status(500).json({ error: 'Failed to create leaderboard' });
      }
    } finally {
      return res.status(202).json({ message: 'Hooray Correct Answer'});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while verifying the answer' });
  }
});


module.exports = router;
