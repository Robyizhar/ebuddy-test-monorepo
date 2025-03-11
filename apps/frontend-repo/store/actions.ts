import { createAction } from "@reduxjs/toolkit";
import User from "../apis/user";

export const setUsers = createAction<User[]>("users/setUsers");
export const updateUserAction = createAction<User>("users/updateUser");
