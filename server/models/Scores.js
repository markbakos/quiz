const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    quizID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    quizType: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Score', ScoreSchema, 'scores');