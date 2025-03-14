import admin from "firebase-admin";
import serviceAccount from "../e-buddy-test-91b01-firebase-adminsdk-fbsvc-282233fa46.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

export const db = admin.firestore();
export default admin;
