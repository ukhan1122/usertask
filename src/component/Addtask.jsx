import axios from "axios";
import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addTask } from "../redux/TaskSlice";
import './Addtask.css'

const Addtask = () =>{
    const [title,settitle] = useState('')
    const dispatch= useDispatch()
    const userId = localStorage.getItem('userId'); 

    console.log("Current userId from localStorage:", userId); 


    const handlesubmit =async(e)=>{
        e.preventDefault();
    
        if(!title.trim()) return;
            try {
                const response = await axios.post('http://localhost:8000/task/addtask',{
                    title,
                    completed:false,
                    userId
                })
                dispatch(addTask(response.data.task))
                console.log("task add by api",response.data)
                settitle('')
            } catch (error) {
                console.log("error in task add",error)
            }
        


    }
    return(

        <div className="addtask">
            
            <input type="text" value={title} onChange={(e)=>settitle(e.target.value)} />
            <button type="submit" onClick={handlesubmit} >Add Task</button>
        </div>
    )
}
export default Addtask