import { createReducer } from "@reduxjs/toolkit";
import { setUsers, updateUserAction } from "./actions";
import User from "../apis/user";

export interface UserState { users: User[]; }

const initialState: UserState = { users: [] };

export const userReducer = createReducer(initialState, (builder) => {
    builder.addCase(setUsers, (state, action) => {
        state.users = action.payload;
    })
    .addCase(updateUserAction, (state, action) => {
        const index = state.users.findIndex((u) => u.userId === action.payload.userId);
        if (index !== -1) state.users[index] = action.payload;
    });
});
