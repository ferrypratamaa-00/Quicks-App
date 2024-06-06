import { configureStore } from "@reduxjs/toolkit";
import actionMenuReducer from "./actions/actionMenuSlice";
import inboxReducer from "./actions/inboxSlice";

const store = configureStore({
    reducer: {
        actionMenu: actionMenuReducer,
        inbox: inboxReducer,
    },
});

store.subscribe(() => {
    const state = store.getState();
    console.log("STORE CHANGED : ", state.actionMenu);
});

export default store;
