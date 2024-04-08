//require('dotenv').config();
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({path: './env'});

const PORT = process.env.PORT || 8000;


connectDB()
.then(() => {
    app.listen(PORT , () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((error) => {
    console.log("MONGODB CONNECTION FAILED !!! ", error);
})









/*
import express from 'express';
const app = express();

;(async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", () => {
            console.log("Error: ", error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("Error: " , error);
        throw error;
    }
})() // IIFEs
*/