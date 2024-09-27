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

    if (userExists && userExists.completed_questions) {
      if (userExists.completed_questions.includes(questionId)) {
        return res.status(403).json({ message: 'Not allowed: question already completed' });
      }
    }

    await db.collection('auth').updateOne(
      { _id: new ObjectId(userId) },
      { $addToSet: { completed_questions: questionId } }
    );

    const eventId = question.event_id;
    const scoreToAdd = question.points;

    // Find if the user has already completed this question for the event
    const participant = await db.collection('leaderboard').findOne(
      { event_id: eventId, 'participants.userId': new ObjectId(userId) },
      { projection: { 'participants.$': 1 } }
    );

    if (participant && participant.participants.length > 0) {
      // The user already exists in the leaderboard for this event
      if (participant.participants[0].completed_questions && participant.participants[0].completed_questions.includes(questionId)) {
        return res.status(403).json({ message: 'Not allowed: question already completed' });
      }
    }

    // Update the leaderboard: add the participant if they don't already exist
    const leaderboardUpdateResult = await db.collection('leaderboard').findOneAndUpdate(
      { event_id: eventId },
      {
        $setOnInsert: { event_id: eventId, totalScore: 0 }, // Initialize the event leaderboard if it doesn't exist
        $addToSet: { participants: { userId: new ObjectId(userId), score: 0, completed_questions: [] } }, // Add user if not already in participants
      },
      { upsert: true, returnDocument: 'after' } // Create the leaderboard if it doesn't exist
    );

    // Increment the user's score and add the completed question
    const scoreUpdateResult = await db.collection('leaderboard').updateOne(
      { event_id: eventId, 'participants.userId': new ObjectId(userId) },
      {
        $inc: { 'participants.$.score': scoreToAdd, totalScore: scoreToAdd }, // Increment user's score and total score
        $addToSet: { 'participants.$.completed_questions': questionId } // Mark the question as completed by the user
      }
    );

    if (scoreUpdateResult.matchedCount > 0) {
      return res.status(202).json({ message: 'Correct answer! Score updated.', newScore: scoreToAdd });
    } else {
      return res.status(500).json({ error: 'Failed to update score in leaderboard' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while verifying the answer' });
  }
});


module.exports = router;
