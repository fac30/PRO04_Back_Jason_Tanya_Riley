/** SQLite database interactions */ 
import { Database } from 'sqlite3';

/** SQLite database interactions */
const db: Database = require('../config/db');

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
}

// Function to get all products
const getAllProducts = (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM products';
    
    db.all(query, [], (err: Error | null, rows: Product[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Function to get a single product by ID
const getProductById = (id: number): Promise<Product | undefined> => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM products WHERE id = ?';
    
    db.get(query, [id], (err: Error | null, row: Product | undefined) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Function to add a new product
const addProduct = (product: Omit<Product, 'id'>): Promise<number> => {
  return new Promise((resolve, reject) => {
    const { name, description, price } = product;
    const query = 'INSERT INTO products (name, description, price) VALUES (?, ?, ?)';
    
    db.run(query, [name, description, price], function(this: { lastID: number }, err: Error | null) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

export {
  Product,
  getAllProducts,
  getProductById,
  addProduct
};
