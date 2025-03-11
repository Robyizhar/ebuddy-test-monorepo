import { Request, Response } from "express";
import { db } from "../config/firebaseConfig";
import { User } from "../entities/user";
import { getFirestore, collection, getDocs, Timestamp } from 'firebase/firestore';
export const updateUserData = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, totalAverageWeightRatings, numberOfRents, recentlyActive }: User = req.body;
        await db.collection("USERS").doc(userId ?? '').set({ totalAverageWeightRatings, numberOfRents, recentlyActive }, { merge: true });
        res.status(200).json({ message: "User data updated successfully" });
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
            return {
                userId: data.userId,
                totalAverageWeightRatings: data.totalAverageWeightRatings,
                numberOfRents: data.numberOfRents,
                recentlyActive: data.recentlyActive ? (data.recentlyActive as Timestamp).seconds : null, // Mengonversi Timestamp ke epoch time
            };
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
