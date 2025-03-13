import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers";
import authSlice from "./auth/AuthSlice";

export const store = configureStore({
    reducer: { 
        user: userReducer, 
        auth: authSlice, 
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
