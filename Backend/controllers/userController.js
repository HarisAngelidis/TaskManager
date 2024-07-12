const userService = require('../services/userService');
const userRoleService = require('../services/userRoleService');
const jwt = require('jsonwebtoken');



async function getAllUsers(req, res) {

   role = req.params.role ;

   flag = true;

   if(!role) {flag = false;}

    try {
    
        const result = await userService.getAllUsers(flag,role);
        res.status(200).json({ result});}
    
     catch (err) {
        res.status(500).json({ msg: `Something went wrong`});
    }
}

async function getUserById(req, res) {
    const id = parseInt(req.params.id);
    try {
        const result = await userService.getUserById(id);
        if (!result.length) {
            res.status(400).json({ msg: `A user with that id does not exist` });
        } else {
            res.status(200).json(result);
        }
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong` });
    }
}

async function addUser(req, res) {
    try {
        const { LastName, FirstName, Age, DateOfBirth, RoleId,Username,Password} = req.body;
        
        if (!LastName || !RoleId || !Username || !Password) {
            res.status(400).json({ msg: `The new user must have a last name,a role id, a username and a password` });
            return;
        }

        
        const exists = await userRoleService.getUserRoleById(RoleId);

      
      
        if(!exists.length>0){
            res.status(400).json({ msg: `The role id does not exist` });
            return;
        }
        
        await userService.addUser(LastName, FirstName, Age, DateOfBirth,RoleId,Username,Password);
        res.status(200).json({ msg: 'User added' });
    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

async function updateUser(req, res) {
    const id = parseInt(req.params.id);
    const { LastName, FirstName, Age, DateOfBirth,Username,Password } = req.body;

    console.log(LastName);

    if (!LastName ) {
        res.status(400).json({ msg: `The updated user must have a last name` });
        return;
    }
    
    try {
        const result = await userService.getUserById(id);
        if (!result.length) {
            res.status(400).json({ msg: `A user with that id does not exist` });
        } else {
            await userService.updateUser(id, LastName, FirstName, Age, DateOfBirth,Username,Password);
            res.status(200).json({ msg: 'User updated' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

async function deleteUser(req, res) {
    const id = parseInt(req.params.id);
    try {
        const result = await userService.getUserById(id);
        if (!result.length) {
            res.status(400).json({ msg: `A user with that id does not exist` });
        } else {
            await userService.deleteUser(id);
            res.status(200).json({ msg: 'User deleted' });
        }
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong` });
    }
}

async function getUsersByDate(req, res) {

   
    const Apo = req.query.Apo;
    const Mexri = req.query.Mexri;

  
    try {
        const result = await userService.getUsersByDate(Apo, Mexri);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong` });
    }}


    async function UserLogin(req, res) {
        const { Username, Password } = req.body;
      
        try {
          const result = await userService.UserLogin(Username, Password);
      
          if (result.length > 0) {
            const user = result[0];
            console.log("TOKEN_KEY: ", process.env.TOKEN_KEY); 
            const token = jwt.sign(
              { userId: user.UserId, role: user.RoleId },
              process.env.TOKEN_KEY,
              { expiresIn: '2h' }
            );
            console.log("Token created:", token);
            res.status(200).json({ success: true, token, user });
          } else {
            res.status(400).json({ success: false, message: 'Invalid credentials' });
          }
        } catch (err) {
          console.error('Login error:', err);
          res.status(500).json({ success: false, message: 'Something went wrong' });
        }
      }
      
    

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    getUsersByDate,
    UserLogin

};