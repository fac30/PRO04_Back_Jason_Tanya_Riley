/** SQLite database interactions with users */
import db from '../config/db';

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
	try {
		const query = 'INSERT INTO buyer (email, password) VALUES (?, ?)';
		const result = await db.run(query, [email, hashedPassword]);
		if (result && typeof result === 'object' && 'id' in result) {
			return (result.id as number) > 0;
		} else {
			console.error('Failed to create user: Unexpected result format');
			return false;
		}
	} catch (error) {
		console.error('Error creating user:', error);
		return false;
	}
}

export const emailExists = async (email: string): Promise<boolean> => {
	try {
		const query = 'SELECT COUNT(*) as count FROM users WHERE email = ?';
		const result = await db.get(query, [email]);
		
		// Check if result is defined and has a 'count' property
		if (result && typeof result === 'object' && 'count' in result) {
			return (result as { count: number }).count > 0;
		} else {
			console.error('Unexpected result format:', result);
			return false;
		}
	} catch (error) {
		console.error('Error checking if email exists:', error);
		throw error;
	}
}

export const getBuyerByValue = async (value: string): Promise<Buyer> => {
	const column = 'email'; /* later I'll add a switch statement to change this  */
	
	const query = `SELECT * FROM buyer WHERE ${column} = ?`;

	return new Promise((resolve, reject) => {
		db.get(query, [value], (err: Error | null, row: Buyer) => {
			if (err) {
				reject(err);
			} else {
				resolve(row)
			}
		});
	})
};



  export const getBuyerByEmail = async (email: string): Promise<{ id: number; email: string; password: string } | null> => {
    try {
      const query = 'SELECT * FROM buyer WHERE email = ?';
      const result = await db.get(query, [email]);
      if (result && typeof result === 'object' && 'id' in result && 'email' in result && 'password' in result) {
        return {
          id: result.id as number,
          email: result.email as string,
          password: result.password as string
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
  }