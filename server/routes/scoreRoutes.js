const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Score = require('../models/Scores');

router.get('/quizzes', async (req, res) => {
   try{
       const quizzes = await Quiz.find();
       res.json(quizzes);
   } catch (e) {
       res.status(500).json({message: 'Error finding quizzes'});
   }
});

router.get('/quizzes/:id', async (req, res) => {
    try{
        const quiz = await Quiz.findById(req.params.id);
        if(!quiz){
            return res.status(404).json({message: 'QuizHome not found'});
        }
        res.json(quiz);
    }
    catch (e) {
        res.status(500).json({message: 'Error finding quiz'});
    }
});

router.post('/quizzes', async (req, res) => {
    try{
        const { title, description, questions } = req.body;
        const newQuiz = new Quiz({ title, description, questions });
        await newQuiz.save();
        res.status(201).json(newQuiz);
    }
    catch (e) {
        res.status(500).json({message: 'Error saving quiz', e});
    }
})

router.post('/scores', async (req, res) => {
    try {
        const { username, quizID, score, quizType } = req.body;

        const updatedScore = await Score.findOneAndUpdate(
            { username, quizID },
            { score, quizType, date: new Date() },
            { new: true, upsert: true, runValidators: true }
        );
        res.status(200).json(updatedScore);
    }
    catch (e) {
        res.status(500).json({message: 'Error saving score', e});
    }
})

router.get('/leaderboard/:quizID', async(req, res) => {
    try {
        const { quizID } = req.params;
        const leaderboard = await Score.find({quizID})
            .sort({score: -1, date: -1})
            .limit(10)
            .select('username score date -_id');

        res.json(leaderboard);
    } catch (e) {
        console.error('Error fetching leaderboard', e);
        res.status(500).json({message: 'Error fetching leaderboard', error: e});
    }
})

module.exports = router;