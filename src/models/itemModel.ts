
import { Pool } from 'pg'; // Import PostgreSQL client
const pool = new Pool({
  connectionString: 'your_connection_string_here', // Update with your PostgreSQL connection string
});

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
}

// Function to get all products
const getAllProducts = (): Promise<Product[]> => {
  return pool.query('SELECT * FROM products') //
    .then(result => result.rows) 
    .catch(err => Promise.reject(err));
};

// Function to get a single product by ID
const getProductById = (id: number): Promise<Product | undefined> => {
  return pool.query('SELECT * FROM products WHERE id = $1', [id]) 
    .then(result => result.rows[0]) 
    .catch(err => Promise.reject(err));
};

// Function to add a new product
const addProduct = (product: Omit<Product, 'id'>): Promise<number> => {
  const { name, description, price } = product;
  return pool.query('INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING id', [name, description, price]) // Use RETURNING to get the new ID
    .then(result => result.rows[0].id) 
    .catch(err => Promise.reject(err));
};

export {
  Product,
  getAllProducts,
  getProductById,
  addProduct
};