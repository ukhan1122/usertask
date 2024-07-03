import React, { useState } from "react";
import './Taskitem.css';
import { Dialog, Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../redux/TaskSlice";

const Taskitem = ({task, ontoggle,bgblur}) => {
    const [open, setopen] = useState(false);
    const [title, settitle] = useState(task.title);
    const dispatch = useDispatch();
    
    const handleopen = () => {
        setopen(true);
        bgblur(true)
    };
  
    const handleclose = () => {
        setopen(false);
        bgblur(false)
    };

    const handleupdate = async (e) => {
        e.preventDefault();

        if(!title.trim()) return;
        try {
            const response = await axios.put(`http://localhost:8000/task/update/${task._id}`, {title});
            dispatch(updateTask(response.data));
            console.log("task update successfully", response.data);
        } catch (error) {
            console.log("error while updating task", error);
        }
        handleclose();
    };

    const handledelete = async() => {
        try {
            const response = await axios.delete(`http://localhost:8000/task/delete/${task._id}`);
            dispatch(deleteTask(task._id));
            console.log("task deleted successfully", response.data);
        } catch (error) {
            console.log("error while deleting task", error);
        }
    };

    return(
        <div className="task-item">
            <div className="content">
                <input type="checkbox" className="check-item" 
                    checked={!!task.completed} 
                    onChange={() => ontoggle(task._id)}
                />
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.title}
                </span>
            </div>
            <div>
                <button onClick={handleopen}>Edit</button>
                <button onClick={handledelete}>Delete</button>
            </div>

            <Dialog open={open} onClose={handleclose}>
                <DialogTitle>Edit Your Task</DialogTitle>
                <DialogContent>
                    <TextField
                        value={title}
                        onChange={(e) => settitle(e.target.value)}

                        className="custom-text-field"
                    />
                </DialogContent>
                <DialogActions>
                    <Button className="cancel-button" onClick={handleclose}>Cancel</Button>
                    <Button className="save-button" onClick={handleupdate}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Taskitem;
