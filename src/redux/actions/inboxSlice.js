import { createSlice } from "@reduxjs/toolkit";

const inboxSlice = createSlice({
    name: "inbox",
    initialState: {
        loadingAction: false,
        messageEditID: null,
        messageDeleteID: null,
    },
    reducers: {
        setLoadingAction: (state, action) => {
            state.loadingAction = action.payload;
        },
        setMessageEditID: (state, action) => {
            state.messageEditID = action.payload;
        },
        setMessageDeleteID: (state, action) => {
            state.messageDeleteID = action.payload;
        },
    },
});

export const { setLoadingAction, setMessageEditID, setMessageDeleteID } =
    inboxSlice.actions;

export default inboxSlice.reducer;
