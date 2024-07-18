const userService = require('../services/userService');
const userRoleService = require('../services/userRoleService');
const jwt = require('jsonwebtoken');
const {sendEmail} = require('../services/emailService');



async function getAllUsers(req, res) {


    try {
    
        const result = await userService.getAllUsers();
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
        console.log(req.body);
        const { LastName, FirstName, Age, DateOfBirth, RoleId,Username,Password,email} = req.body;
        
        if (!LastName || !RoleId || !Username || !Password || !email) {
            res.status(400).json({ msg: `The new user must have a last name,a role id, a username and a password` });
            return;
        }

        
        const exists = await userRoleService.getUserRoleById(RoleId);

      
      
        if(!exists.length>0){
            res.status(400).json({ msg: `The role id does not exist` });
            return;
        }
    

        await userService.addUser(LastName, FirstName, Age, DateOfBirth,RoleId,Username,Password,email);
       
        const emailBody = `
        Νέος χρήστης δημιουργήθηκε!
        Επώνυμο: ${LastName}
        Όνομα Χρήστη: ${Username}
        Email: ${email}
    `;

    try {
        await sendEmail('xangelidis100@gmail.com', 'Δημιουργία χρήστη', emailBody);
        console.log('Email sent successfully');
    } catch (emailError) {
        console.error('Failed to send email:', emailError);
    }
        res.status(200).json({ msg: 'User added' });

      
    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

async function updateUser(req, res) {
    
    const user = req.user;
    let userId = user.UserId;
    const { LastName, FirstName, Age, DateOfBirth,Username,Password,email } = req.body;


    if (!LastName ) {
        res.status(400).json({ msg: `The updated user must have a last name` });
        return;
    }
    
    try {
        
        const result = await userService.getUserById(user.UserId);
       
        if (!result.length) {
          
            res.status(400).json({ msg: `A user with that id does not exist` });
            
        } 
        
        else {

            if (user.UserId === +req.params.id) {
                userId = user.UserId;
                console.log(userId);
              
            await userService.updateUser(userId, LastName, FirstName, Age, DateOfBirth,Username,Password,email);
            res.status(200).json({ msg: 'User updated' });}
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
        }}



        async function getEmailByUsername(req, res) {
            const Username = (req.params.username);
            try {
                const result = await userService.getEmailByUsername(Username);
               

                if (!result.length) {
                    res.status(400).json({ msg: `A user with that username does not exist` });
                } else {
                    
                    const emailBody = `
                    Ο κωδικός σας είναι : 
                    ${result[0].Password}
                    
                `;
            
                try {
                    await sendEmail(result[0].email, 'Κωδικός χρήστη',emailBody );
                    console.log('Email sent successfully');
                } catch (emailError) {
                    console.error('Failed to send email:', emailError);
                }

                    res.status(200).json({ msg: 'Email sent' });
                }
            } catch (err) {
                res.status(500).json({ msg: `Something went wrong` });
            }
        }

        async function countUsers(req,res){

            

            try {
    
                const result = await userService.countUsers();
                const count = result[0]["count(UserId)"];
                console.log(count);
              
                res.status(200).json({ count});}
            
             catch (err) {
                res.status(500).json({ msg: `Something went wrong`});
            }


        }
      
      
        
    

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    getUsersByDate,
    UserLogin,
    getEmailByUsername,
    countUsers

};