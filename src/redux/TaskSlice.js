import { createSlice } from "@reduxjs/toolkit";


export const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: []
    },
    reducers: {
        setTasks: (state, action) => {
            console.log('task data ', action.payload);
            state.tasks = action.payload;
        },
        addTask: (state, action) => {
            console.log("task added",action.payload)
            state.tasks.unshift(action.payload);
        },
        deleteTask: (state, action) => {
            
            console.log("task deleted",action.payload)
            state.tasks = state.tasks.filter(task => task._id !== action.payload);
        },
        toggleTask: (state, action) => {
            console.log("toggletask",action)
            const index = state.tasks.findIndex(task => task._id === action.payload);
            if (index !== -1) {
                state.tasks[index]. completed = !state.tasks[index]. completed;
            }
        },
      
        updateTask: (state, action) => {
            console.log("task upating", action.payload)
            const index = state.tasks.findIndex(task => task._id === action.payload._id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        }
    }
});

export const { setTasks, addTask, deleteTask, toggleTask, updateTask } = taskSlice.actions;
export const selectTasks = (state) => state.task.tasks;
export default taskSlice.reducer;
