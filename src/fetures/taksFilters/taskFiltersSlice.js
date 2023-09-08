import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status: "defult",
    priority: "defult"
}

const taskFiltersSlice = createSlice({
    name: "taskFilters",
    initialState,
    reducers: {
        changeStatus: (state, action) => {
            state.status = action.payload
        },
        changePriority: (state, action) => {
            state.priority = action.payload
        }
    }
});

export const { changePriority, changeStatus } = taskFiltersSlice.actions;
export default taskFiltersSlice.reducer;