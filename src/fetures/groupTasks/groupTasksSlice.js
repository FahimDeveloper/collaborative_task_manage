import { createSlice } from "@reduxjs/toolkit"
import { addTask, addUserInGroup, createGroup, getGroupsArr, getTasksArr } from "../dataInLocal";

const initialState = {
    groups: [],
    tasks: [],
    groupData: {}
}

const groupTaskSlice = createSlice({
    name: "groupTasks",
    initialState,
    reducers: {
        newGroup: (state, action) => {
            createGroup(action.payload);
            state.groups.push(action.payload)
        },
        catchGroups: (state) => {
            const groups = getGroupsArr();
            state.groups = groups
        },
        catchTasks: (state) => {
            const tasks = getTasksArr();
            state.tasks.push(tasks)
        },
        createTask: (state, action) => {
            addTask(action.payload);
            state.tasks.push(action.payload)
        },
        addMembarInGroup: (state, action) => {
            const { groupId, user } = action.payload
            addUserInGroup(groupId, user);
            state.groups.map(group => {
                if (group.id === groupId) {
                    return group.users.push(user)
                }
                return group
            })
        }
    }

});

export const { newGroup, catchGroups, catchTasks, createTask, addMembarInGroup } = groupTaskSlice.actions;
export default groupTaskSlice.reducer;