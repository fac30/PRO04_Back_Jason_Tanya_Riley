// Define API routes
import express from 'express';
import { handleGetAllProducts, handleGetProductById } from '../controllers/itemController';

const router = express.Router();

// Get all products
router.get('/products', handleGetAllProducts);

// Get a product by ID
router.get('/products/id', handleGetProductById);

export default router;