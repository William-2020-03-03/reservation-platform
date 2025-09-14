import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === "production";
if (isProduction) {
    console.log('Mongo URI:', process.env.MONGO_URI);
    console.log('JWT Secret:', process.env.JWT_SECRET);
} else {
    const envPath = path.resolve(__dirname, '../../.env');
    dotenv.config({ path: envPath });
}


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection failed', err);
        process.exit(1);
    }
};