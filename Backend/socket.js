const socketIo = require('socket.io');

let io;

function initializeSocket(server) {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

function getIo() {
  if (!io) {
    
    throw new Error('Socket.io not initialized');
  }

  console.log("exoyme socket");
  return io;
}

module.exports = {
  initializeSocket,
  getIo,
};
