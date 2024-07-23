const taskService = require('../services/taskService');
const socket = require('../socket');

async function getAllTasks(req, res) {
  console.log("doulevo");
  let userId = null;
  const user = req.user;
  try {
    if (user.RoleId !== 1 && user.UserId === +req.params.id) {
      userId = user.UserId;
    }
    const result = await taskService.getAllTasks(userId);
    
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ msg: `Something went wrong` });
  }
}

async function getAllTaskItemsByTaskId(req, res) {
  
  const { id } = req.params;
  try {
    
    const result = await taskService.getAllTaskItemsByTaskId(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ msg: `Something went wrong` });
  }
}

async function addTask(req, res) {
  const {title, description} = req.body;
  const user = req.user;
  let userId = null;
  try {
    if (user.UserId === +req.params.id) {
      userId = user.UserId;
    }
    const result = await taskService.addTask(userId, title, description);
    socket.getIo().emit('newTask', { title, description });
    res.status(200).json({ id: result });
  } catch (err) {
    res.status(500).json({ msg: `Something went wrong` });
  }
}
async function addTaskItem(req, res) {
  const {title} = req.body;
  const { id } = req.params;
  
  try {
   
    const result = await taskService.addTaskItem(id, title);
    res.status(200).json({ id: result });
  } catch (err) {
    res.status(500).json({ msg: `Something went wrong` });
  }
}

async function updateTask(req, res) {
  const { userId, title, description } = req.body;
  const { id } = req.params;
  const user = req.user;
  let UserId = null;
  try {
    if (user.UserId === userId) {
       UserId = user.UserId;
       await taskService.updateTask(id, UserId, title, description);
       res.status(200).json({ msg: 'Task updated' });
    }

    else{res.status(405).json({ msg: `You are not the owner of that task` });}
  
  } catch (err) {
    res.status(500).json({ msg: `Something went wrong` });
  }
}

async function updateTaskItem(req, res) {
  const {title} = req.body;
  const { id } = req.params;
 
  try {
  
       await taskService.updateTaskItem(id,title);
       res.status(200).json({ msg: 'TaskItem updated' });
  
  
  } catch (err) {
    res.status(500).json({ msg: `Something went wrong` });
  }
}

async function updateStatus(req, res) {
  const { userId,statusId} = req.body;
  const { id } = req.params;
  const user = req.user;
  console.log("nai");
  
  try {
    if (user.UserId === userId) {
       
       await taskService.updateStatus(id,statusId);
       res.status(200).json({ msg: 'Status updated' });
    }

    else{res.status(405).json({ msg: `You are not the owner of that task` });}
  
  } catch (err) {
    res.status(500).json({ msg: `Something went wrong` });
  }
}

async function deleteTask(req, res) {

  const { id } = req.params;
  let userId = null;


  try {
   
    userId =  await taskService.getUserIdByTaskId(id);
    
    }

   catch (err) {
    res.status(501).json({ msg: `Something went wrong` });
  }


  const user = req.user;

  try {
    if (user.UserId === userId[0].UserId) {
    await taskService.deleteTask(id);
    res.status(200).json({ msg: 'Task deleted' });}

    else{res.status(405).json({ msg: `You are not the owner of that task` });}
  

  } catch (err) {
    res.status(500).json({ msg: `Something went wrong` });
  }}



  async function deleteTaskItem(req, res) {

    const { id } = req.params;
  
    try {
     
      await taskService.deleteTaskItem(id);
      res.status(200).json({ msg: 'TaskItem deleted' });
  
    } catch (err) {
      res.status(500).json({ msg: `Something went wrong` });
    }
  }



module.exports = {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
  updateStatus,
  getAllTaskItemsByTaskId,
  addTaskItem,
  updateTaskItem,
  deleteTaskItem
};
