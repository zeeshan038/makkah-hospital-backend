const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const connectDb = require('./config/db');
const socketIo = require("socket.io");
const cors = require("cors");
const index = require('./routes/index');
const app = express();

app.use(cors({
  origin: [
    "https://makkah-hospital-frontend-1.vercel.app",
    "https://makkah-hospital-frontend.vercel.app",
    "https://mmc-super-admin.vercel.app",
    "http://localhost:5174"
  ],
  credentials: true
}))
app.use(express.json());


connectDb();

// Routes
app.use('/api', index);

const port = process.env.PORT || 4000; 
const server = app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

// Initialize Socket.IO
const io = socketIo(server, {
  cors: {
    origin: [
      "https://makkah-hospital-frontend-1.vercel.app",
      "https://mmc-super-admin.vercel.app",
      "http://localhost:5174"
    ],
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
