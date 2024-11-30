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
            return res.status(404).json({message: 'Quiz not found'});
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
    try{
        const { username, quizID, score, quizType } = req.body;
        const newScore = new Score({ username, quizID, score, quizType });
        await newScore.save();
        res.status(201).json(newScore);
    }
    catch (e) {
        res.status(500).json({message: 'Error saving score', e});
    }
})

module.exports = router;