import { Request, Response } from 'express';
import OpenAI from 'openai';

// Initialize OpenAI
// Note: Requires OPENAI_API_KEY in .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
});

// @desc    Chat with AI Assistant
// @route   POST /api/ai/chat
// @access  Private
export const chatWithAI = async (req: Request, res: Response) => {
  const { message, context } = req.body;

  if (!process.env.OPENAI_API_KEY) {
     // Mock response if no key configured
     res.json({ reply: "I am a simulated AI assistant. Please configure OPENAI_API_KEY to get real responses. You asked: " + message });
     return;
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful learning assistant for Certiva Pro, an ed-tech platform. You help students learn coding skills.' },
        { role: 'user', content: message }
      ],
      model: 'gpt-3.5-turbo',
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error: any) {
    console.error('AI Error:', error);
    res.status(500).json({ message: 'AI Service Error', error: error.message });
  }
};
