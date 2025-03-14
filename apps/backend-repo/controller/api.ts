import { Request, Response } from "express";
import { db } from "../config/firebaseConfig";
import { User } from "../entities/user";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const MAX_NUMBER_OF_RENTS = 100; // For example, the upper limit of rent is 100 times
const MAX_RECENT_ACTIVITY = 30; // Activity limits in the last 30 days

export const updateRecentlyActive = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.body;

        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }

        /* Get current user data */
        const userRef = db.collection("USERS").doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const userData = userDoc.data();
        if (!userData) {
            res.status(500).json({ error: "Invalid user data" });
            return;
        }

        const { totalAverageWeightRatings: R, numberOfRents: N } = userData;

        /* Make sure the R and N values ​​are available before calculating. */
        if (R === undefined || N === undefined) {
            res.status(400).json({ error: "Missing necessary fields for calculation" });
            return;
        }

        /* Calculate last activity time in seconds */
        const timestamp = Math.floor(Date.now() / 1000);
        const lastActivityInDays = (timestamp - (userData.recentlyActive || timestamp)) / (60 * 60 * 24); /* Convert to days */

        /* Normalize Value */
        const normalizedR = R / 5; 
        const normalizedN = Math.min(N / MAX_NUMBER_OF_RENTS, 1); /* Maksimum 1 */
        const normalizedA = 1 - Math.min(lastActivityInDays / MAX_RECENT_ACTIVITY, 1); /* Smaller is better */

        /* Count overallValue */
        const overallValue = (normalizedR * 0.5) + (normalizedN * 0.3) + (normalizedA * 0.2);

        /* Update Firestore */
        await userRef.update({
            recentlyActive: timestamp,
            overallValue
        });

        const fireBase = await db.collection("USERS").orderBy("overallValue", "desc").get();
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
        const fireBase = await db.collection("USERS").orderBy("overallValue", "desc").get();
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
