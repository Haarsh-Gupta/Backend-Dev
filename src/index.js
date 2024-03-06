// require('dotenv').config({path : './env'})
import dotenv from 'dotenv'
import connectDB from "./db/index.js";

dotenv.config({path : './env'})

connectDB()
.then(() => {
    const port = process.env.PORT || 8000 ;
    app.listen(port , () => {
        console.log(`Server is running at port :- ${port}`);
    })
})
.catch((err) => {
    app.on('error' , (error) => {
        console.log("Error by clg of app" , error) 
        throw(error)
    })
    console.log("MONGO DB CONNECTION FAILED !!" , err) ;
})
























/*
import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';
import express from 'express';
const app = express() ;

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on('error' , (error) => {
            console.log("Error by clg of app" , error) 
            throw(error)
        })

        app.listen(process.env.PORT , () => {
            console.log(`You app is listening of PORT :- ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("ERROR :" , error)
        throw error ;   
    }
})()

*/
