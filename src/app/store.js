import { configureStore } from "@reduxjs/toolkit"
import usersReducer from "../fetures/users/usersSlice";
import groupTasksReducer from "../fetures/groupTasks/groupTasksSlice";
import taskFilterReducer from "../fetures/taksFilters/taskFiltersSlice";

const store = configureStore({
    reducer: {
        usersData: usersReducer,
        groupTasks: groupTasksReducer,
        filters: taskFilterReducer
    }
});

export default store;