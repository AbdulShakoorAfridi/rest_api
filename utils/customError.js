

// custom error class extending Error

export class customError extends Error {

    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 ? "client error failed" : "server error";
        this.isOperational = true;
        
        Error.captureStackTrace(this, this.constructor)
    }

};