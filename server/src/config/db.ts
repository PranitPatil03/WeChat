import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MongoDB connection URL is undefined.");
    }

    const options = {
      autoIndex: true,
    };

    const connection = await mongoose.connect(mongoURI, options);

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
