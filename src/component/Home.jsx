import React, { useState } from "react";
import './Home.css'
import Addtask from "./Addtask";
import TaskList from "./TaskList";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "../redux/UserSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { addTask, selectTasks, toggleTask} from "../redux/TaskSlice";



const Home = () =>{
    const user = useSelector(selectUser)
    const task = useSelector(selectTasks)
    const [blurBackground ,setblurBackground] = useState(false)
    console.log("username",user.existinguser.name)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handlblurbackgorond = (state) =>{
        setblurBackground(state)
        console.log("Blur Background State:", state); // Add console log to check state
  

    }

    const handletask = (newtask) =>{
    
            dispatch(addTask(newtask))

    }
    const handlelogout = (e) =>{
        e.preventDefault();
        dispatch(logout())  
        navigate('/login')
    }
   
    const ontoggle = (taskId) =>{
     dispatch(toggleTask(taskId))

    }
    if (!user) {
        return <Navigate to="/login" />;
    }
    return(

        <div className={`Home-continer ${blurBackground ? 'blur-background' : ""}`}>
           <div>
            <div className="main-contianer">
           <h1>Wellcome<span style={{color:"green"}}> {user.existinguser.name}</span> To Task AREA</h1>
           
           <button onClick={handlelogout}>Logout</button>
           
           </div>
            <Addtask newtask = {handletask} />
           </div>
            <TaskList 
            task={task}
            bgblur = {handlblurbackgorond}
            ontoggle = {ontoggle}
            />
        </div>
    )
}
export default Home