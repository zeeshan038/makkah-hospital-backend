const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const connectDb = require('./config/db');
const socketIo = require("socket.io");
const cors = require("cors");
const index = require('./routes/index');
const app = express();

app.use(cors({
  origin: "https://makkah-hospital-frontend-1.vercel.app", 
  credentials: true
}));
app.use(express.json());
app.use(cors());

connectDb();

// Routes
app.use('/api', index);

// Start server with HTTP and Socket.IO
const port = process.env.PORT || 4000; 
const server = app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

// Initialize Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "https://makkah-hospital-frontend-1.vercel.app",
    credentials: true
  }
});

// Make io accessible in controllers via app
app.set("io", io);

io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});
