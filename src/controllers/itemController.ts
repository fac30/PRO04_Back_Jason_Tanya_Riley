import { Request, Response } from 'express';
import * as ItemModel from '../models/itemModel';


export const handleGetAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await ItemModel.getAllProducts();  // Assuming this returns an array of products
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
};


export const handleGetProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId: number = Number(req.params.id); // Ensure productId is a number
        const product = await ItemModel.getProductById(productId); // Assuming this returns a single product object
        if (product) {
            console.log(product);
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve product' });
    }
};