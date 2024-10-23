/** SQLite database interactions with users */
import db from '../config/db';

// create here 2 functions:

export const createBuyer = async (email: string, hashedPassword: string): Promise<boolean> => {
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