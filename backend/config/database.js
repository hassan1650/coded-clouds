import mongoose from "mongoose";

const databaseConnection = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected successfully: ${connected.connection.host}`)
    } catch (error) {
        console.log("Database connection failed", error);
    }
};

export default databaseConnection;