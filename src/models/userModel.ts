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

interface BuyerRow {
    id: number;
    email: string;
    password: string;
}

export const createBuyer = async (username: string, email: string, hashedPassword: string): Promise<boolean> => {
    const query = 'INSERT INTO buyer (name, email, password) VALUES (?, ?, ?)';

    return new Promise((resolve, reject) => {
        db.run(query, [username, email, hashedPassword], function (err) {
            if (err) {
                console.error('Error creating user:', err);
                return reject(false);
            }
            if (this.lastID) {
                resolve(true);
            } else {
                console.error('Failed to create user: No lastID');
                resolve(false);
            }
        });
    });
};

// export const emailExists = async (email: string): Promise<boolean> => {
// 	try {
// 		const query = 'SELECT COUNT(*) as count FROM buyer WHERE email = ?';
// 		const result = await db.get(query, [email]);
		
// 		// Check if result is defined and has a 'count' property
// 		if (result && typeof result === 'object' && 'count' in result) {
// 			return (result as { count: number }).count > 0;
// 		} else {
// 			console.error('Unexpected result format:', result);
// 			return false;
// 		}
// 	} catch (error) {
// 		console.error('Error checking if email exists:', error);
// 		throw error;
// 	}
// }

// export const getBuyerByValue = async (value: string): Promise<Buyer> => {
// 	const column = 'email'; /* later I'll add a switch statement to change this  */
	
// 	const query = `SELECT * FROM buyer WHERE ${column} = ?`;

// 	return new Promise((resolve, reject) => {
// 		db.get(query, [value], (err: Error | null, row: Buyer) => {
// 			if (err) {
// 				reject(err);
// 			} else {
// 				resolve(row)
// 			}
// 		});
// 	})
// };

// export const getBuyerByEmail = async (email: string): Promise<{ id: number; email: string; password: string } | null> => {
//     try {
//         const query = 'SELECT * FROM buyer WHERE email = ? COLLATE NOCASE';
//         console.log('Executing query:', query, 'with email:', email);  // Log the query and the email
        
// 		// Use db.get() directly without awaiting db itself (ensure db is initialized properly)
//         const result = await db.get(query, [email]);
// 		console.log('Query result:', result);

//         if (result && typeof result === 'object' && 'id' in result && 'email' in result && 'password' in result) {
//             return {
//                 id: result.id as number,
//                 email: result.email as string,
//                 password: result.password as string
//             };
//         } else {
//             return null;
//         }
//     } catch (error) {
//         console.error('Error fetching user by email:', error);
//         throw error;
//     }
// };

export const getBuyerByEmail = async (email: string): Promise<{ id: number; email: string; password: string } | null> => {
    const query = 'SELECT * FROM buyer WHERE email = ? COLLATE NOCASE';

    return new Promise((resolve, reject) => {
        db.get(query, [email], function (err, row: BuyerRow | undefined) {
            if (err) {
                console.error('Error fetching user:', err);
                return reject(err);  // Reject with error
            }

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