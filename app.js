const express = require('express');
const app = express();
// Load Router
const tasks = require('./routes/tasks');
// Loaded Func to connect to MongoDB using Mongoose  
const connectDB = require('./db/connect.js');
// Load dotenv Module to use env Vars inside .env file
require('dotenv').config();
// Load custom MDW funcs notFound and errorHandlerMiddleware
const notFound = require('./middleware/not-found.js');
const errorHandlerMiddleware = require('./middleware/error-handler');


// Using Middlewares:
// To serve static files
app.use(express.static('./public/'));
// To parse json Objects from req body
app.use(express.json());

// Handling Routes
// /api/v1/tasks route Specific
app.use('/api/v1/tasks',tasks);

// Custom MDW to handle 404 and send response
app.use(notFound);
// Custom MDW to handle errors from asyncWrapper (try catch Block)
app.use(errorHandlerMiddleware);

// Setting port var to Either Value in Env var PORT or 3000 as Default
const port = process.env.PORT || 3000;

// We are only going to start the server to listen or hoisted on given PORT only if our Appl's connection to MongoDB Database is successful. 
async function start(){
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`Server is Listening on Port ${port}...`));
    }
    catch(error){console.log(error);}
}
start();
