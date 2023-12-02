import { createReducer } from "@reduxjs/toolkit";
import { setUpdatePostAction } from "../actions/post";



const initialState = {
    post_id: '',
    title: '',
    about: '',
    visibility: '',
    notes: ''
};

export const updatePostReducer = createReducer(initialState, (builder) => {
    builder

        .addCase(setUpdatePostAction, (state, action) => {
        state.post_id = action.payload.post_id;
        state.title = action.payload.title
        state.about = action.payload.about
        state.visibility = action.payload.visibility
        state.notes = action.payload.notes
    })
});