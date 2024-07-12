const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log("Auth Header:", authHeader); 
  console.log("Token:", token); 
  console.log("TOKEN_KEY: ", process.env.TOKEN_KEY); 

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    console.log("Decoded token:", decoded); 
  } catch (err) {
    console.error('Token verification error:', err); 
    return res.status(401).send('Invalid Token');
  }
  return next();
};

const isAdmin = (req, res, next) => {
 
  console.log(req.user.role);
  if (req.user.role !== 1) {
    console.log("OXI");
    return res.status(405).send('Access denied. Admins only.');
  }
  next();
};

module.exports = { verifyToken, isAdmin };
