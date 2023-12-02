import { createReducer } from "@reduxjs/toolkit";
import { setErrorMessageAction, setSuccessMessageAction } from "../actions/messageAction";

const initialState = {
    success: '',
    error: '',
};

export const messageReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setErrorMessageAction, (state, action) => {
            console.log(action)
            state.error = action.payload.message;
        })
        .addCase(setSuccessMessageAction, (state, action) => {
            console.log(action)
            state.success = action.payload.message;
        })
});