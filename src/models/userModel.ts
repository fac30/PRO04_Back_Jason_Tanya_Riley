/** PostgreSQL database interactions with users */
import { Pool } from 'pg';  // Change to PostgreSQL dependency
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,  // Use your PostgreSQL connection string
});

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

interface BuyerRow {
    id: number;
    email: string;
    password: string;
}

export const createBuyer = async (username: string, email: string, hashedPassword: string): Promise<boolean> => {
    const query = 'INSERT INTO buyer (name, email, password) VALUES ($1, $2, $3) RETURNING id';  // Use $1, $2, $3 for parameterized queries

    return new Promise((resolve, reject) => {
        pool.query(query, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error creating user:', err);
                return reject(false);
            }
            if (result.rows.length > 0) {
                resolve(true);
            } else {
                console.error('Failed to create user: No rows returned');
                resolve(false);
            }
        });
    });
};

// ... existing code ...

export const getBuyerByEmail = async (email: string): Promise<{ id: number; email: string; password: string } | null> => {
    const query = 'SELECT * FROM buyer WHERE email = $1';  // Use $1 for parameterized queries

    return new Promise((resolve, reject) => {
        pool.query(query, [email], (err, result) => {
            if (err) {
                console.error('Error fetching user:', err);
                return reject(err);  // Reject with error
            }

            const row = result.rows[0];  // Get the first row from the result
            if (row) {
                return resolve({
                    id: row.id as number,
                    email: row.email as string,
                    password: row.password as string,
                });
            } else {
                return resolve(null);
            }
        });
    });
};