import { Router } from "express";
import { login } from "../controller/api";

const authRoutes = Router();
authRoutes.post("/login", login);

export default authRoutes;
