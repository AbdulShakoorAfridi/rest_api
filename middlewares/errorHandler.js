import { customError } from "../utils/customError.js";


export const notFound = (req,res,next) => {

    const err = new customError(`Could not find ${req.originalUrl} on the server `, 404)
    err.status = "failed";
    next(err);
    
}


const devError = (error, res) => {
    res.status(error.statusCode).json({
        status:error.status,
        message: error.message,
        stackTrace: error.stack,
        error: error
    })
}
const prodError = (error, res) => {

    if(error.isOperational){
        res.status(error.statusCode).json({
            status:error.status,
            message: error.message
        })
    }else{
        res.status(500).json({
            status:"error",
            message:"Something went wrong! Please try again later."
        })
    }
}
// handling cast error 
const handleCastError = (err) =>{
    const msg = `Invalid value ${err.value} for the filed ${err.path}!`;
    return new customError(msg, 400)
}
// handling handleDuplicateKeyError error 
const handleDuplicateKeyError = (err) =>{
    const msg = `${err.keyValue.name} : already exists! Please try with a different name instead.`;
    return new customError(msg, 400)
};

// handling mongoose Validation error 
const ValidationError = (err) =>{
     const errMsg = Object.values(err.errors).map(err => err.message);
     const joinMsg = errMsg.join(', ');
    const msg = `Invalid Input data! : ${joinMsg} `;
    return new customError(msg, 400)
};

// error handler for api

export const errorHandler = (error, req,res,next) => {

    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal server error";
    error.status = error.status || "error";

    if(process.env.NODE_ENV === "development"){
      devError(error,res)
    }else if(process.env.NODE_ENV === "production"){
        // castError 
        if(error.name === "CastError") error = handleCastError(error);

        // handle Duplicate Key Error
        if(error.code === 11000) error = handleDuplicateKeyError(error);

        // handle mongoose ValidationError Error
        if(error.name === "ValidationError") error = ValidationError(error);
    
        prodError(error,res);
    }

}