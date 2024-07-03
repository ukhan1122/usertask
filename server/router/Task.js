const express = require('express')
const router = express.Router();
const task = require('../model/Task')
const signup = require('../model/Signup')


// this route for get all task 
router.get('/',async(req,res)=>{
    try {
        const tasks = await task.find({useId:req.user._id});
        res.json(tasks) 
        
    } catch (error) {
        
    }
})
// this router for a new task 
router.post('/addtask', async(req,res)=>{
   try {
    
    const {title,completed,userId} = req.body;
    console.log("recieved data",title,completed,userId)
    const user = await signup.findById(userId);
    if(!user){
        console.log("user not found with id",userId)
        return res.status(204).json({message:"user not found"})
    }
    const newtask = new task({
        title,
        completed,
        userId
    })
    await newtask.save();
    res.status(201).json({message:"task add successfuly",task:newtask})

    
   } catch (error) {
    res.status(306).json({error:"error adding task"})
    console.log(error)
    
   }
})

// this route for updating the task of the relvent id 

router.put('/update/:id',async(req,res)=>{
   try {
     const {id} = req.params;
     const updatetask = await task.findByIdAndUpdate(id,req.body,{new:true})
     if(!updatetask){
        res.status(404).json({mesaage:"task not found"})
     }
     res.status(200).json(updatetask)
   } catch (error) {
    console.log("error task upating",error)
    if (!res.headersSent) {
        res.status(500).json({ error: "Error updating task" });
    }
   }

})
router.delete('/delete/:id',async(req,res)=>{

    try {
        const {id} = req.params;
        const deletetask = await task.findByIdAndDelete(id)

        if (!deletetask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({message:"task delete successfully"})
    } catch (error) {
        console.log("error deleteing task",error)
    }
})

module.exports = router;