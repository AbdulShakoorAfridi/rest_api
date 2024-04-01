import mongoose,{Schema} from "mongoose";

const productSchema = new Schema({
    name:{
        type:String,
        required:[true, " name is required!"],
        unique:true,
        trim:true,
    },
    description:{
        type:String,
        required:[true, " description is required!"],
        unique:true,
        trim:true,
    },
    price:{
        type:Number,
        required:[true, " price is required!"],
        trim:true,
    },
    category:{
        type:String,
        required:[true, " category is required!"],
        trim:true,
    },
    rating:{
        type:Number,
        default:4.5,
    },
    company:{
        type:String,
        enum:{
            values:["Amazon","Apple","Samsung","Sony","Patagonia"],
            message:"Please enter a valid company"
        }
    },
    stock:{
        type:Number,
        required:[true, " stock is required!"],
        trim:true,
    },
    

}, {timestamps: true});

export const Product = mongoose.model("Product", productSchema);