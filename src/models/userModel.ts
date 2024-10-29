/** PostgreSQL database interactions with users */
import pool from '../config/connectionDb';

interface Buyer {
	id: number,
	name: string,
	email: string,
	password: string,
	role: string,
	location?: number,
	transactions?: number,
	reviews?: number
}

export const createBuyer = async (username: string, email: string, hashedPassword: string): Promise<boolean> => {
    const query = 'INSERT INTO buyer (name, email, password) VALUES ($1, $2, $3) RETURNING id';  // Use $1, $2, $3 for parameterized queries

    try {
        const result = await pool.query(query, [username, email, hashedPassword]);
        return result.rows.length > 0;
      } catch (err) {
        console.error('Error creating user:', (err as Error).message);
        return false;
      }
};

export const getBuyerByEmail = async (email: string): Promise<{ id: number; email: string; password: string } | null> => {
    const query = 'SELECT id, email, password FROM buyer WHERE email = $1';

    try {
        const result = await pool.query(query, [email]);
        return result.rows[0] || null;
    } catch (err) {
        console.error('Error fetching user:', (err as Error).message);
        throw err;
    }
};