import { Request, Response, NextFunction } from "express";
import admin from "../config/firebaseConfig";

export interface AuthRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    // const token = req.headers.authorization;
    const token = req.headers.authorization?.split(" ")[1];
    console.log('token');
    
    if (!token) {
        res.status(403).json({ message: "Unauthorized" });
        return;
    }

    try {
        req.user = await admin.auth().verifyIdToken(token);
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};

export default authMiddleware;
