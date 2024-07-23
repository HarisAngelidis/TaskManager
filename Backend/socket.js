const socketIo = require('socket.io');

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    socket.on('newTask', (data) => {
      console.log('New task received:', data);
    });

    socket.on('join', (data) => {
      console.log('New task received:', data);
    });
    
  });

  
}

function getIo() {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }

  console.log('Socket is initialized');
  return io;
}

module.exports = {
  initializeSocket,
  getIo,
};
