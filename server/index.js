const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Body parser for POST

// YouTube API Key
const YOUTUBE_API_KEY = 'AIzaSyBAHfKwhtQHaZAYhsdu1idEhVoymwfwG_c';
console.log('✅ YouTube API Key Loaded:', YOUTUBE_API_KEY);

// YouTube Search Route
app.get('/api/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'No search query provided' });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        q: query,
        part: 'snippet',
        type: 'video',
        maxResults: 1,
        key: YOUTUBE_API_KEY,
      },
    });

    const videoId = response.data.items[0]?.id?.videoId;
    if (!videoId) {
      return res.status(404).json({ error: 'No video found' });
    }

    res.json({ videoId });
  } catch (err) {
    console.error('❌ YouTube API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch YouTube data' });
  }
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Feedback Route
const feedbackRoutes = require('./feedback/feedback.routes');
app.use('/api', feedbackRoutes); // POST /api/feedback

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});