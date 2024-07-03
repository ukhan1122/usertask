const express = require('express')
const router = express.Router();
const signup =  require('../model/Signup.js');
const bycraft = require('bcrypt');
const task = require('../model/Task.js');


router.get('/Signup',(req,res)=>{

    res.send("heloo from signup")
})

router.post('/Signup', async(req,res)=>{
    try {
        const{name,email,password,dob}= req.body;
        const existinguser = await signup.findOne({email:req.body.email});

        if(existinguser){
            return res.status(400).json({error:"user already exist"})
        }
        const hashpassword = await bycraft.hash(password,10)

        const user = new signup({
            name,
            email,
            password:hashpassword,
            dob,
        })
        await user.save()
        res.status(201).json({message:"user successfuly registerd",name: user.name})
    } catch (error) {

        res.status(300).json({error:"error registering user"})
        
    }
})

router.post('/login',async(req,res)=>{
    const{email,password}= req.body;
 try {
    const existinguser = await signup.findOne({email})
    if(!existinguser){
        return res.status(200).json({message:"user not found"})
    }
    const validpassword = await bycraft.compare(password,existinguser.password)
    if(!validpassword){
        return res.status(203).json({message:"password incorrect"})
    }
        const tasks = await task.find({userId:existinguser._id})
        res.status(200).json({ message: "Login successful", existinguser, tasks });
}
        catch (error) {
    res.status(303).json({message:"error while login",error})
    console.log(error)
    
 }
})
    
module.exports = router;