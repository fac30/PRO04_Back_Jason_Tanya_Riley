/** SQLite database interactions with users */
import db from '../config/db';

// create here 2 functions:

// createUser


// getUserByEmail
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