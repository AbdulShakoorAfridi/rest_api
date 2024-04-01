import { userModel } from "../models/user.model.js";
import { customError } from "../utils/customError.js";
import { asyncHandler } from "../utils/asyncHandler.js";







// register controller
// access public 
// route api/auth/register

const registerUser = asyncHandler(async (req,res,next) =>{
        const {email} = req.body;

        const alreadyExist = await userModel.findOne({email});
        if(!alreadyExist){
            const user = await userModel.create(req.body);
            res.status(201).json({
                success: true,
                message:"User created successfully",
                user
            });
        }else{
            const err = new customError("Email already exist", 400);
            err.status = "failed";
            next(err);
         }
});

export {registerUser};