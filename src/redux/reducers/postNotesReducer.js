import { createReducer } from "@reduxjs/toolkit";
import { setPostNotesAction } from "../actions/postNotesAction";



const initialState = {
    post_name: '',
    post_notes: '',
};

export const postNotesReducer = createReducer(initialState, (builder) => {
    builder

        .addCase(setPostNotesAction, (state, action) => {
        state.post_name = action.payload.post_name;
        state.post_notes = action.payload.post_notes
    })
});