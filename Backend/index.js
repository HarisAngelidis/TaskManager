const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const socketIO = require('socket.io');
const { addTaskFile, getTaskFile, deleteTaskFile } = require('./services/taskService');
const userRoutes = require('./routes/userRoutes');
const userRoleRoutes = require('./routes/userRoleRoutes');
const taskRoutes = require('./routes/taskRoutes');
const dotenv = require('dotenv')
const socket = require('./socket');

const http = require('http');




dotenv.config();
process.env.TOKEN_KEY;

const app = express();
const cors = require('cors');

/*
let server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.set('socket', io)*/

app.use(cors()); 

let server = http.createServer(app);


socket.initializeSocket(server);


socket.getIo();


/*const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('A user connected');
});*/


socket.getIo().emit('join');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); 
      }
  });
  
  const upload = multer({ storage: storage });


app.use(bodyParser.json());




  app.post('/api/tasks/:taskId/upload', upload.single('file'), async (req, res) => {
    console.log(req.params.taskId + req.file.path);
     if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    
    }
  
    try {
      await addTaskFile(req.params.taskId, req.file.path);
      res.status(200).json({ message: 'File uploaded successfully.', filePath: req.file.path });
    } catch (err) {
      res.status(500).send('Failed to upload file.');
    }
  });
  
  app.get('/api/tasks/:taskId/file', async (req, res) => {
    console.log(req.params.taskId);
    try {
      const filePath = await getTaskFile(req.params.taskId);
      console.log(filePath);
      if (filePath) {
        res.sendFile(path.resolve(filePath));
      } else {
        res.status(404).send('File not found.');
      }
    } catch (err) {
      res.status(500).send('Failed to retrieve file.');
    }
  });
  
  app.delete('/api/tasks/:taskId/file', async (req, res) => {
    try {
      await deleteTaskFile(req.params.taskId);
      res.status(200).json({ message: 'File deleted successfully.'});
    } catch (err) {
      res.status(500).send('Failed to delete file.');
    }
  });
  

app.use(userRoutes);
app.use(userRoleRoutes);
app.use(taskRoutes);




const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
