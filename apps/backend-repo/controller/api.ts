import { Request, Response } from "express";
import { db } from "../config/firebaseConfig";
import { User } from "../entities/user";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
export const updateRecentlyActive = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }

        const timestamp = Math.floor(Date.now() / 1000);

        await db.collection("USERS").doc(userId).update({
            recentlyActive: timestamp,
            overallValue: 2
        });

        const fireBase = await db.collection("USERS").get();
        if (fireBase.empty) {
            res.status(404).json({ message: "No users found" });
            return;
        }
        
        const users: User[] = fireBase.docs.map(doc => {
            const data = doc.data();
            return {
                userId: doc.id,
                totalAverageWeightRatings: data.totalAverageWeightRatings,
                numberOfRents: data.numberOfRents,
                recentlyActive: data.recentlyActive,
            };
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const fetchUserData = async (req: Request, res: Response): Promise<void> => {
    try {
        const fireBase = await db.collection("USERS").get();
        if (fireBase.empty) {
            res.status(404).json({ message: "No users found" });
            return;
        }

        const users: User[] = fireBase.docs.map(doc => {
            const data = doc.data();
            console.log(data.recentlyActive);
            return {
                userId: doc.id,
                totalAverageWeightRatings: data.totalAverageWeightRatings,
                numberOfRents: data.numberOfRents,
                recentlyActive: data.recentlyActive,
            };
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Email and password are required!" });
        return;
    }
    try {
        const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
            {
                email,
                password,
                returnSecureToken: true,
            }
        );
        res.json(response.data);
    } catch (error: any) {
        res.status(401).json({
            error: error.response?.data?.error?.message || "Failed Login!",
        });
    }
}
