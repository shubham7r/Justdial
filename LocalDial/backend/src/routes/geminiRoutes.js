const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${API_KEY}`;

router.post("/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Received prompt:", prompt);

    const response = await axios.post(GEMINI_URL, { prompt: { text: prompt } });
    console.log("Gemini API response:", response.data);

    if (!response.data.candidates || response.data.candidates.length === 0) {
      return res.status(500).json({ error: "No candidates received from Gemini API" });
    }

    res.json({ output: response.data.candidates[0].output });
  } catch (error) {
    console.error("API request failed:", error.response?.data || error.message);
    res.status(500).json({ error: "API request failed", details: error.message });
  }
});

module.exports = router;
