import { configureStore } from "@reduxjs/toolkit";
import userreducer from '../redux/UserSlice';
import TaskSlice from "../redux/TaskSlice";

export default configureStore({
    reducer:{
        user: userreducer,
        task: TaskSlice
    }
})
