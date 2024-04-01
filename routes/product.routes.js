import express from "express";
import { allProducts, createProduct, deleteProduct, singleProduct, updateProduct } from "../controllers/products.controller.js";
const router = express.Router();



router.get('/products',allProducts);
router.post('/products',createProduct);
router.get('/products/:id',singleProduct);
router.patch('/products/:id',updateProduct);
router.delete('/products/:id',deleteProduct);

export default router;