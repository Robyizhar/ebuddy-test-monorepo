import { Router } from "express";
import { updateUserData, fetchUserData } from "../controller/api";
import authMiddleware from "../middleware/authMiddleware";

const userRoutes = Router();

userRoutes.post("/update--user-data", authMiddleware, updateUserData);
userRoutes.get("/fetch-user-data", authMiddleware, fetchUserData);

export default userRoutes;
