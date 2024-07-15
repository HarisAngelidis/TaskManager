const jwt = require('jsonwebtoken');
const { queryDatabase } = require('./database/database-calls');


const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Auth Header:", authHeader); 
    console.log("Token:", token); 
    console.log("TOKEN_KEY: ", process.env.TOKEN_KEY); 
  
    if (!token) {
      return res.status(403).send('A token is required for authentication');
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const [user] = await queryDatabase('SELECT * FROM users WHERE userId = ?', decoded.userId);
    req.user = user;

    console.log("Decoded token:", decoded); 
  
  } catch (e) {
    console.error('Token verification error:', e); 
    return res.status(401).send('Invalid Token');
  }
  return next();
};

const isAdmin = (req, res, next) => {
 
  console.log(req.user.role);
  if (req.user.RoleId !== 1) {
    console.log("OXI");
    return res.status(405).send('Access denied. Admins only.');
  }
  next();
};

module.exports = { verifyToken, isAdmin };
