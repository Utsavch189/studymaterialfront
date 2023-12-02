import { configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "./reducers/loadingReducer";
import { authReducer } from "./reducers/authReducer";
import { userReducer } from "./reducers/userReducer";
import { messageReducer } from "./reducers/messageReducer";
import { updateSectionReducer } from "./reducers/updateSectionReducer";
import { postNotesReducer } from "./reducers/postNotesReducer";
import { updatePostReducer } from "./reducers/updatePostReducer";


const store = configureStore({
    reducer: {
        loadingReducer: loadingReducer,
        authReducer: authReducer,
        userReducer: userReducer,
        messageReducer: messageReducer,
        updateSectionReducer: updateSectionReducer,
        postNotesReducer: postNotesReducer,
        updatePostReducer: updatePostReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;