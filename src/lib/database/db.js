import dotenv from 'dotenv';    
import mongoose from 'mongoose';

dotenv.config();   
 
export let isConnected = false;

const connectDB = async () => {
    if (!process.env.MONGO_URL) {
        console.log('MONGO_URL is not found in environment variables.');
        return;
    }

    if (isConnected) {
        console.log('Already connected to the database.');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL);
        isConnected = true;
        console.log('Successfully connected to the database.');
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
};

export default connectDB;
