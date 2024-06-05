import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    floating: {
        menu: false,
        inbox: false,
        task: false,
    },
    detail: {
        inbox: null,
        task: null,
    },
};

const actionMenuSlice = createSlice({
    name: "actionMenu",
    initialState,
    reducers: {
        openFloatingMenu: (state, action) => {
            state.floating.menu = true;
        },
        closeFloatingMenu: (state, action) => {
            state.floating.menu = false;
        },
        openInbox: (state, action) => {
            state.floating.inbox = true;
        },
        closeInbox: (state, action) => {
            state.floating.inbox = false;
        },
        openTask: (state, action) => {
            state.floating.task = true;
        },
        closeTask: (state, action) => {
            state.floating.task = false;
        },
        toggleFloatingMenu: (state, action) => {
            const { key, value } = action.payload;
            state.floating[key] = value;
        },
        toggleDetail: (state, action) => {
            const { key, id } = action.payload;
            state.detail[key] = state.detail[key] === id ? null : id;
        },
    },
});

export const {
    openFloatingMenu,
    closeFloatingMenu,
    openInboxDetail,
    closeInboxDetail,
    openTaskDetail,
    closeTaskDetail,
    toggleFloatingMenu,
    toggleDetail,
} = actionMenuSlice.actions;

export default actionMenuSlice.reducer;
