import { createSlice } from "@reduxjs/toolkit"
import { addMessageInGroup, addTask, addUserInGroup, changeTaskStatus, createGroup, getGroupsArr, getTasksArr } from "../dataInLocal";

const initialState = {
    groups: [],
    tasks: [],
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
        },
        addMessage: (state, action) => {
            const { id, message } = action.payload;
            addMessageInGroup(id, message)
            state.groups.map(group => {
                if (group.id === id) {
                    return group.message.push(message)
                }
                return group
            })
        },
        taskStatusChanged: (state, action) => {
            const { groupId, messageId, status } = action.payload;
            changeTaskStatus(groupId, messageId, status)
            state.groups.map(group => {
                if (group.id === groupId) {
                    return group.message.map(message => {
                        if (message.messageId === messageId) {
                            return message.status = status
                        }
                        return message
                    })
                }
                return group
            })
        },
    }

});

export const { newGroup, catchGroups, catchTasks, createTask, addMembarInGroup, addMessage, taskStatusChanged } = groupTaskSlice.actions;
export default groupTaskSlice.reducer;