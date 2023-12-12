const { Server } = require("ws");
const wss = new Server();
wss.on("connection", (socket) => {
    console.log("A user connected");
  
    // Handle WebSocket events here
  
    socket.on("message", (message) => {
      console.log("Received message:", message);
      // Handle the incoming message
    });
  
    socket.on("close", () => {
      console.log("User disconnected");
    });
  });
  
  // Function to be used as a WebSocket route handler
  module.exports.handleWebSocketConnection = (ws, req) => {
    wss.handleUpgrade(req, ws, (socket) => {
      wss.emit("connection", socket, req);
    });
  };