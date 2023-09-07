import { createSlice } from "@reduxjs/toolkit"
import { addTask, createGroup, getGroupsArr, getTasksArr } from "../dataInLocal";

const initialState = {
    groups: [],
    tasks: []
}

const groupTaskSlice = createSlice({
    name: "groupTasks",
    initialState,
    reducers: {
        newGroup: (state, data) => {
            createGroup(data),
                state.groups.push(data)
        },
        catchGroup: (state) => {
            const group = getGroupsArr();
            state.groups.push(group)
        },
        catchTasks: (state) => {
            const tasks = getTasksArr();
            state.tasks.push(tasks)
        },
        createTask: (state, action) => {
            addTask(action.payload);
            state.tasks.push(action.payload)
        }
    }

});

export const { newGroup, catchGroup, catchTasks, createTask } = groupTaskSlice.actions;
export default groupTaskSlice.reducer;