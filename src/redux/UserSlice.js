import{createSlice} from "@reduxjs/toolkit"
import { setTasks } from "./TaskSlice";

export const UserSlice = createSlice({
    name:"user",
    initialState:{
        user:null
    },
    reducers:{
        login:(state,action)=>{
            console.log('action recived ',action)
            state.user = action.payload;
            
            console.log('updateing state  ',action.payload)
        },
        logout:(state)=>{
            state.user = null;
        }
    }
})
export const {login,logout} = UserSlice.actions;
export const selectUser = (state) => state.user.user;

export const loginusr = (userdata) => async(dispatch)=>{
    dispatch(login(userdata));
    dispatch(setTasks(userdata.tasks))
}
export default UserSlice.reducer;    