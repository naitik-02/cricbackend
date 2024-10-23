import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.URL)
        console.log("Database Connected");
    } catch (error) {
        console.error("Database connection error:", error.message);
    }
};

export default connectDatabase; 
