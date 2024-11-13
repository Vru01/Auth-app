const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:8081"],
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log('A user connected with ID:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  socket.on("send-message", (message) => {
    console.log('Message received:', message);
    io.emit("receive-message", message);
  });

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });
});
  
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
