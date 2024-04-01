import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log("connection to database :",conn.connection.host)
        
    } catch (error) {
        console.log("database connection error: " + error);
        process.exit(1);
    }
};