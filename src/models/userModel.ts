/** SQLite database interactions with users */
import db from '../config/db';

// create here 2 functions:

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