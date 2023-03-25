// Load Class 'CustomAPIError' which is used to check if Passed/forwarded Error from the controller was Custom ie its object/instance or was from catch block of asyncWrapper.
const { CustomAPIError } = require('../errors/custom-error');

const errorHandlerMiddleware = (err,req,res,next)=>{
    // if() handles 404 error ie Task with specific ID with correct syntax not found.
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg : err.message});
    } 
    // Below Error comes from catch() of asyncWrapper through next() it handles Errors when incorrect syntax Task ID is used to search for a Task.  
    return res.status(500).json({msg :'Searching with Wrong Syntax ID for the Task OR Incorrect input for CreateTask, TRY AGAIN!!!'});
}
module.exports = errorHandlerMiddleware;