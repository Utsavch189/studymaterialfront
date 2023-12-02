import { createReducer } from "@reduxjs/toolkit";
import { user } from "../actions/userAction";


const initialState = {
    username: '',
    email: '',
    full_name: '',
    phone: '',
    user_meta: {
        meta_id: '',
        doj: '',
        profile_pic_url: ''
    }
}

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(user, (state, action) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.full_name = action.payload.full_name
            state.phone = action.payload.phone
            state.user_meta.meta_id = action.payload.user_meta.meta_id
            state.user_meta.doj = action.payload.user_meta.doj
            state.user_meta.profile_pic_url = action.payload.user_meta.profile_pic_url
        })
})