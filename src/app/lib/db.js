import { MongoClient } from 'mongodb';

let client;

const createConnection = async () => {
    if (!client) {
        try {
            // Logging the connection attempt
            console.log("Attempting to connect to MongoDB...");

            // MongoDB connection URI
            const uri = "mongodb://localhost:27017"; // Replace with your MongoDB URI if different
            const dbName = "turnit-human"; // Replace with your actual database name

            // Initialize MongoDB client and connect
            client = new MongoClient(uri, { 
                serverSelectionTimeoutMS: 130000, // Set connection timeout
                
            });

            await client.connect();
            console.log("MongoDB connection established");
        } catch (error) {
            console.error("MongoDB connection failed:", error.message);
            throw error; // Propagate error if necessary
        }
    }
    return client.db("turnit-human"); // Return the MongoDB database instance
}

export const closeConnection = async () => {
    if (client) {
        await client.close();
        console.log("MongoDB connection closed");
    }
};

export default createConnection;
