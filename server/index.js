const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');       // <-- added
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Load YouTube API Key from .env
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
if (!YOUTUBE_API_KEY) {
  console.warn('⚠ Missing YOUTUBE_API_KEY in .env');
}

// 🔍 YouTube Search Endpoint
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

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
const feedbackRoutes = require('./feedback/feedback.routes');
const userRoutes = require('./user.routes');

app.use('/api/feedback', feedbackRoutes);
app.use('/api/users', userRoutes);

// ------------------- Serve React Frontend in Production -------------------
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}
// -------------------------------------------------------------------------

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});