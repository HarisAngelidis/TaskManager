const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const userRoleRoutes = require('./routes/userRoleRoutes');
const taskRoutes = require('./routes/taskRoutes');
const dotenv = require('dotenv')

dotenv.config();
process.env.TOKEN_KEY;

const app = express();

const cors = require('cors');
app.use(cors()); 
app.use(bodyParser.json());

app.use(userRoutes);
app.use(userRoleRoutes);
app.use(taskRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));