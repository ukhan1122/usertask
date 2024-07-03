import React, { useState } from "react";
import './Signup.css'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/TaskSlice";

const Signup = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const[formdata,setformdata] = useState({
    name:'',
    email:'',
    password:'',
    dob:''
  })

   const handlechange = (e) =>{
    setformdata({...formdata,[e.target.name]:e.target.value})

   }
    const handlesubmit = async(e)=>{
        e.preventDefault()
        try {
           const response = await axios.post('http://localhost:8000/Authentication/Signup',formdata)
            console.log(response.data)
            navigate('/login')
            dispatch(setTasks(response.data.tasks))

            
        } catch (error) {
            console.log(error)
        }


    }
    
    return(
        <div className="form-continer">

            <form onSubmit={handlesubmit}>
            <h1>Signup Form</h1>
                <label htmlFor="">Name</label>
                <input type="text" name="name" placeholder="enter your name" onChange={handlechange}/>
                <label htmlFor="">Email</label>
                <input type="text"name="email" placeholder="enter your email" onChange={handlechange}/>
                <label htmlFor="">Password</label>
                <input type="text" name="password" placeholder="enter your password"onChange={handlechange} />
                <label htmlFor="" >Dob</label>
                <input type="date" name="dob" className="checkbox-container"onChange={handlechange} />
                <div>
                <input type="checkbox" /><label htmlFor="" className="terms-label">I have accept the term and conditon</label>
                
                </div>
                   <button type="submit">Create Account</button>
                <span>already have account ?    
                    <Link to="/login"> Login</Link>
                </span>
            </form>
        </div>

    )
}
export default Signup;