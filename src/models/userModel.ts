/** Postgres database interactions with users */
import pool from './config/connectionDb';

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


export const getBuyerByEmail = async (email: string): Promise<{ id: number; email: string; password: string } | null> => {
    const query = 'SELECT * FROM buyer WHERE email = ? COLLATE NOCASE';
    console.log('Executing query:', query, 'with email:', email);

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