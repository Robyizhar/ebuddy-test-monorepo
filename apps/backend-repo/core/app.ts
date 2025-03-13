import express from 'express';
import userRoutes from '../routes/userRoutes';
import authRoutes from '../routes/authRoutes';
// import authMiddleware from '../middleware/authMiddleware';

const app = express();
app.use(express.json());
// app.use(authMiddleware);
app.use('/api', userRoutes);
app.use('/api', authRoutes);

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;
