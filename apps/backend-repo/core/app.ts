import express from 'express';
import userRoutes from '../routes/userRoutes';
import authRoutes from '../routes/authRoutes';
import cors from "cors";
// import authMiddleware from '../middleware/authMiddleware';

const app = express();
app.use(express.json());
// app.use(authMiddleware);
app.use(
    cors({
        origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: "Content-Type, Authorization",
        credentials: true,
    })
);
app.use('/api', userRoutes);
app.use('/api', authRoutes);

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;
