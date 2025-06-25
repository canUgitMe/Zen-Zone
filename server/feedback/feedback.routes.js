const express = require('express');
const router = express.Router();
const Feedback = require('./Feedback');

router.post('/feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error('❌ Feedback save error:', err);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

module.exports = router;