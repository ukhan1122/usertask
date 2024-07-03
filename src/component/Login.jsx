import axios from "axios";
import React, { useState } from "react";
import { useDispatch,} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login,} from "../redux/UserSlice";
import { setTasks } from "../redux/TaskSlice";

const Login = ()=>{
const dispatch = useDispatch()    
const navigate = useNavigate()
const[formdata,setformdata]=useState({
    email:"",
    password:""
})
const handlechange = (e) =>{
    setformdata({...formdata,[e.target.name]:e.target.value})

}
const handlesubmit = async(e) =>{
    e.preventDefault()

    try {
        const response = await axios.post('http://localhost:8000/Authentication/login',formdata)
        console.log(response.data)
        const userId = response.data.existinguser._id;
        console.log("userId:", userId);
        
        localStorage.setItem('userId', userId);
        dispatch(login(response.data))
        dispatch(setTasks(response.data.tasks))
        navigate('/')
        
    } catch (error) {
        console.log("error in login",error)
        
    }
}

    return(
        <div className="form-continer">
            <form onSubmit={handlesubmit}>
            <h1>Login Form</h1>
                <label htmlFor="">Email</label>
                <input type="text"name="email" onChange={handlechange} placeholder="enter your email" />
                <label htmlFor="">Password</label>
                <input type="text"name="password" onChange={handlechange} placeholder="enter your password" />
               <div>
                <input type="checkbox" /><label htmlFor="" className="terms-label">I have accept the term and conditon</label>
                
                </div>
                   <button type="submit" >Login</button>
                <span>Have't not Account ?  
                    <Link to="/signup">  Signup</Link>
                </span>
            </form>
        </div>
    )
}
export default Login;