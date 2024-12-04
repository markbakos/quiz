const express = require('express');
const User = require('../models/User.js');
const router = express.Router();

router.get('/profile/:username', async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({username: user.username, createdAt: user.createdAt});
    } catch (e) {
        res.status(500).json({ message: 'Error finding user' });
    }
})

module.exports = router;