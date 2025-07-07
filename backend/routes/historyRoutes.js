const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const ReviewHistory = require('../models/ReviewHistory');

router.post('/', protect, async (req, res) => {
    const { code, language, review } = req.body;

    if (!code || !language || !review) {
        return res.status(400).json({ message: 'All fields (Code, language, and review) are required.' });
    }

    try {
        const historyEntry = new ReviewHistory({
            user: req.user._id,
            code,
            language,
            review
        });

        const savedEntry = await historyEntry.save();
        res.status(201).json(savedEntry);
    } catch (error) {
        console.error('Error saving review history:', error);
        res.status(500).json({ message: 'Failed to save review history.', error: error.message });
    }

});

router.get('/', protect, async (req, res) => {
    try {
        const history = await ReviewHistory.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(history);
    } catch (error) {
        console.error('Error fetching review history:', error);
        res.status(500).json({ message: 'Failed to fetch review history.', error: error.message });
    }
});

module.exports = router;