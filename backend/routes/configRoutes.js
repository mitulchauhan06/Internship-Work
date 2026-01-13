// routes/configRoutes.js
import express from 'express';
const router = express.Router();

// Route to provide OpenAI key to frontend
router.get('/openai-key', (req, res) => {
  try {
    // Return the OpenAI key from backend environment variables
    res.json({ 
      success: true,
      key: process.env.VITE_OPENAI_KEY 
    });
  } catch (error) {
    console.error('Error fetching OpenAI key:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to retrieve OpenAI key' 
    });
  }
});

export default router;