import express from 'express';
import "dotenv/config";
import cors from 'cors';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import friendRouter from './routes/friendRoutes.js';

// Import app and server from the new socket file
import { app, server } from './lib/socket.js';

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '4mb' }));
app.use(cors({
  origin: process.env.FRONTEND_URI, // Match your frontend URL in production
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/status', (req, res) => res.send("Server is running fine!"));

// Routes
app.use('/api/auth', userRouter);
app.use('/api/messages', messageRouter);
app.use('/api/friends', friendRouter);

// Start Server
server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});