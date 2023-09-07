import { createSlice } from "@reduxjs/toolkit";
import { addUser, getUsersArr } from "../dataInLocal";

const initialState = {
    users: []
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        catchUsers: (state) => {
            state.users = getUsersArr();
        },
        addNewUser: (state, action) => {
            addUser(action.payload);
            state.users.push(action.payload)
        },
    }
})

export const { catchUsers, addNewUser } = usersSlice.actions;
export default usersSlice.reducer;