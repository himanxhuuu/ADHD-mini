import mongoose from "mongoose";
import dotenv from "dotenv";


const MONGODB_URI = dotenv.config().parsed?.MONGODB_URI as string | undefined;

let cached = (global as any).mongoose as {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  // For development/testing purposes, if MONGODB_URI is not set or invalid,
  // we'll use a mock connection
  if (!MONGODB_URI) {
    console.warn("⚠️ MONGODB_URI is not set. Using mock database connection.");
    return null;
  }

  try {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI, {
        dbName: process.env.MONGODB_DB || "focusflow",
      });
    }
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.warn(
      "⚠️ MongoDB connection failed. Using mock database connection."
    );
    console.error("MongoDB Error:", error);
    return null;
  }
}
