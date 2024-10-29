import pool from '../config/connectionDb';

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
}

// Function to get all products
const getAllProducts = async (): Promise<Product[]> => {
  try {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
  } catch (err) {
    throw new Error(`Error fetching all products: ${(err as Error).message}`);
  }
};

// Function to get a single product by ID
const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0] || null;
  } catch (err) {
    throw new Error(`Error fetching product by ID: ${(err as Error).message}`);
  }
};

// Function to add a new product
const addProduct = async (product: Omit<Product, 'id'>): Promise<number> => {
  const { name, description, price } = product;
  try {
    const result = await pool.query(
      'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING id',
      [name, description, price]
    );
    return result.rows[0].id;
  } catch (err) {
    throw new Error(`Error adding new product: ${(err as Error).message}`);
  }
};

export {
  Product,
  getAllProducts,
  getProductById,
  addProduct
};