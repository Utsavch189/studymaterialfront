import { createReducer } from "@reduxjs/toolkit";
import { loading } from "../actions/loadingAction";

const initialState = {
    isLoading: false
}

export const loadingReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loading, (state, action) => {
            state.isLoading = action.payload.isLoading
        })
})