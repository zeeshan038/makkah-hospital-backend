// test-socket.js
const { io } = require("socket.io-client");

// Use your backend URL and port
const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  withCredentials: true
});

socket.on("connect", () => {
  console.log("Connected to server with id:", socket.id);
});

socket.on("new-prescription", (data) => {
  console.log("Received new prescription:", data);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});