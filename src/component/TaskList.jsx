import React from "react";
import Taskitem from './Taskitem';

const TaskList = ({task,ontoggle,bgblur}) =>{

    if(!task){
        return(
            
        <div>no data avilable for this user</div>
        )
    }

    return(
        <div style={{textAlign:"center",}}>
            <h3 style={{color:"white"}}>Task List Here</h3>
            {task.map(t =>(
               <div key={t._id} >
                <Taskitem  
                task = {t}
                ontoggle = {ontoggle}
                bgblur= {bgblur}
                
                />

                </div>

            ))}
        </div>
    )
}
export default TaskList;