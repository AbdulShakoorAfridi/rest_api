import mongoose,{Schema} from "mongoose";

var userSchema = new Schema({
    name:{
        type:String,
        required:[true, " name is required!"],
        trim:true,
    },
    email:{
        type:String,
        required:[true, " email is required!"],
        unique:true,
    },
    mobile:{
        type:String,
        required:[true, " mobile number is required!"],
        unique:true,
    },
    password:{
        type:String,
        required:[true, " password is required!"],
    },
},{ timestamps:true});


export const userModel = mongoose.model('User', userSchema);