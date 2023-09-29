import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? '';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as mongoose.ConnectOptions);