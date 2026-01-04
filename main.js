import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.json());

// Gemini setup
const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY,
});

// Home route
app.get("/", (req, res) => {
  res.send("Hello, Gemini");
});

// AI content API
app.post("/api/content", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: question,
    });

    res.json({
      answer: response.text,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Server start
app.listen(3000, () => {
  console.log("Server running on port 3000 ✅");
});
