// Created and exported 'CustomAPIError' child class from JS class main class 'Error'. 
class CustomAPIError extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

// Created & exported Func 'createCustomError' which returns Custom error instance of class 'CustomAPIError' used to handle 404 error in controllers with custom mesg & status code.  
const createCustomError = (msg, statusCode) =>{
    return new CustomAPIError(msg,statusCode);
}

module.exports = { createCustomError, CustomAPIError };