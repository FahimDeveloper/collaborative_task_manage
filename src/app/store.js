import { configureStore } from "@reduxjs/toolkit"
import usersReducer from "../fetures/users/usersSlice";
import groupTasksReducer from "../fetures/groupTasks/groupTasksSlice";

const store = configureStore({
    reducer: {
        usersData: usersReducer,
        groupTasks: groupTasksReducer
    }
});

export default store;