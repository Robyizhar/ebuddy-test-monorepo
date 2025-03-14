import { Router } from "express";
import { updateRecentlyActive, fetchUserData } from "../controller/api";
import authMiddleware from "../middleware/authMiddleware";

const userRoutes = Router();

userRoutes.post("/update-user-data", authMiddleware, updateRecentlyActive);
userRoutes.get("/fetch-user-data", authMiddleware, fetchUserData);

export default userRoutes;
