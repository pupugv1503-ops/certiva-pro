import { Router, Request, Response } from 'express';

export const aiRouter = Router();

aiRouter.post('/ai-chat', async (req: Request, res: Response) => {
  // Minimal streaming response compatible with current frontend parser.
  // NOTE: Replace with real AI provider later.
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');

  const userMessage = Array.isArray(req.body?.messages)
    ? String(req.body.messages[req.body.messages.length - 1]?.content || '')
    : '';

  const reply = `I’m running on the Node.js backend now. You said: ${userMessage}`;

  const chunks = reply.match(/.{1,20}/g) || [reply];

  for (const chunk of chunks) {
    res.write(`data: ${JSON.stringify({ choices: [{ delta: { content: chunk } }] })}\n\n`);
    await new Promise((r) => setTimeout(r, 10));
  }

  res.write('data: [DONE]\n\n');
  res.end();
});
