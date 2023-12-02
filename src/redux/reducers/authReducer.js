import { createReducer } from "@reduxjs/toolkit";
import { auth } from "../actions/authAction";

const initialState = {
    isAuthenticated: false,
    refresh_token_exp: null,
    access_token_exp: null
}

export const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(auth, (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated
            state.refresh_token_exp = action.payload.refresh_token_exp
            state.access_token_exp = action.payload.access_token_exp
        })
})