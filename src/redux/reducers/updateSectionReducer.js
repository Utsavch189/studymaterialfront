import { createReducer } from "@reduxjs/toolkit";
import { setUpdateSectionAction } from "../actions/section";


const initialState = {
    section_id: '',
    section_name: '',
    created_at: '',
    visibility: '',
    section_about: ''
};

export const updateSectionReducer = createReducer(initialState, (builder) => {
    builder

        .addCase(setUpdateSectionAction, (state, action) => {
        state.section_name = action.payload.section_name;
        state.section_id = action.payload.section_id
        state.created_at = action.payload.created_at
        state.visibility = action.payload.visibility
        state.section_about = action.payload.section_about
    })
});