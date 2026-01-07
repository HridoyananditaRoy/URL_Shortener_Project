//async function to initialize the app

import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); //to use env variables from .env file

import connectDB from './src/config/mongo.config.js';

import shortUrlRoutes from './src/routes/shortUrl.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import cors from 'cors';
import { authenticateUser } from './src/Middlewares/auth.middleware.js';


const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
})); //to allow cross origin requests from frontend to backend, good for development not for production


// import {nanoid} from 'nanoid';

//****Dont think why this not working or this works? its fine see overview. dont take it so serious
//*****But Important is how to scale things,ci/cd pipelines etc.
//to parse incoming request data and form data
app.use(express.json()); //middleware to parse json data
app.use(express.urlencoded({extended:true})); //middleware to parse urlencoded data

// app.post('/api/create',(req,res)=>{

// })
//app.use(authenticateUser); //middleware to authenticate user for protected routes
app.use("/api/auth",authRoutes);
app.use('/api/create',authenticateUser, shortUrlRoutes); //goes to shortUrlRoutes for handling /api/create routeapp.use('',shortUrlRoutes); //for /:id redirect route
app.use("/", shortUrlRoutes);

//start the server
app.listen(5000,()=>{
    connectDB(); //connect to database when server starts
    console.log("Server is running on port http://localhost:5000");
});

//Get - Redirection 
//Post - create short url