// src/app.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import scoreRoutes from './routes/scoreRoutes';
import cors from 'cors'; // Import cors


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/score', scoreRoutes);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('Connected to MongoDB');

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();
