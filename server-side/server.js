const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust this to match your frontend URL
    methods: ["GET", "POST"]
  },
  logger: true,
  engineio_logger: true,
});

app.use(cors());

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', (data) => {
    // Handle automated replies without echoing the original message
    if (data && typeof data.content === 'string') {
      const userMessage = data.content.toLowerCase();

      // Automated replies
      let reply;
      if (userMessage === 'how are you?') {
        reply = { userId: 'bot', content: 'Fine, how about you?', timestamp: new Date().toISOString(), type: 'received' };
      } else if (userMessage === 'hii') {
        reply = { userId: 'bot', content: 'Hello', timestamp: new Date().toISOString(), type: 'received' };
      } else if (userMessage === 'what about the invoice?') {
        reply = { userId: 'bot', content: 'Sure, I will send it soon!', timestamp: new Date().toISOString(), type: 'received' };
      }
      else {
        // Default response for unrecognized messages
        reply = { userId: 'bot', content: "Sorry, I can't understand what you asked.", timestamp: new Date().toISOString(), type: 'received' };
      }

      if (reply) {
        setTimeout(() => socket.emit('message', reply), 1000); // Send the reply only to the sender
      }
    } else {
      console.error('Invalid message format received:', data);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
