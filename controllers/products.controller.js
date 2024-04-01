import { customError } from "../utils/customError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/products.model.js";





export const createProduct = asyncHandler(async (req,res,next) =>{
    const data = req.body;
    const newProduct =await Product.create(data);
   
        return res.status(201).json({
             success: true,
             Product: newProduct
         })
});


export const allProducts = asyncHandler(async(req,res,next) =>{
    const {company,category,name,sort,select} = req.query;

    const queryObject = {};
    if(company){
        queryObject.company = {$regex : company , $options: "i"};;
    }
    if(category){
        queryObject.category = {$regex : category , $options: "i"};;
    }
    if(name){
        queryObject.name = {$regex : name , $options: "i"};
    }

    let proData = Product.find(queryObject)

    if(sort){
       let sortFix = sort.split(",").join(" ");
        proData = proData.sort(sortFix)
    }
    if(select){
       let selectFix = select.split(",").join(" ");
        proData = proData.select(selectFix)
    }

    let page = Number(req.query.page) || 4;
    let limit = Number(req.query.limit) || 5;
    let skip = (page - 1) * limit;
    proData = proData.skip(skip).limit(limit);

   const AllProduct = await proData;
   if(!AllProduct){
    const error = new customError(" Product not found" , 404);
    error.status = "failed";
    return next(error);
   }
    return res.status(201).json({
         success: true,
         total_Products:AllProduct.length,
         Product: AllProduct
     })
   
});


export const singleProduct = asyncHandler((req,res,next) =>{
    const {id } = req.params;
    res.status(200).json({
        success: true,
        message: "Single Product" + " " + id
    })
});


export const updateProduct = asyncHandler((req,res,next) =>{
    const {id} = req.params;
    res.status(200).json({
        success: true,
        message: "update Product" + " " + id
    })
});


export const deleteProduct = asyncHandler((req,res,next) =>{
    const {id} = req.params;
    res.status(200).json({
        success: true,
        message: "delete Product" + " " + id
    })
})