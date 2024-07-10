import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/postRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(express.json());

const connectDB = async () => {
    try {
        const dbURI = process.env.MONGODB_URI || 'mongodb+srv://Jimmy:BreakTheCode@cluster0.otvpayc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(dbURI);
        console.log('MongoDB connected');
    } catch (error:any) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

connectDB();

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 7594;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
