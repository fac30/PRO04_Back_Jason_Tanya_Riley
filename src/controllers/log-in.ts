import { Request, Response } from 'express';
import { getBuyerByEmail } from '../models/userModel';
import bcrypt from 'bcrypt';
import 'express-session';


declare module 'express-session' {
    interface SessionData {
        user: {
            id: number;
            email: string;
        };
    }
}

export const logIn = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const buyer = await getBuyerByEmail(email);
        if (!buyer) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const match = await bcrypt.compare(password, buyer.password);
        if (!match) {
            res.status(401).json({ message: 'Login failed: Incorrect password.' });
            return;
        }

        req.session.user = {
            id: buyer.id,
            email: buyer.email,
        };

        res.status(200).json({ message: 'Login successful', user: { id: buyer.id, email: buyer.email } });
        return;

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

import pool from '../config/connectionDb'; // Import your pool

// export const loginUser = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   try {
//     // Authenticate the user (pseudo code, replace with your actual logic)
//     const user = await pool.query('SELECT * FROM buyer WHERE email = $1', [email]);
    
//     if (user.rows.length === 0) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     const validPassword = password === user.rows[0].password; // Replace with hashed password comparison
//     if (!validPassword) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Store user data in the session
//     req.session.user = {
//       id: user.rows[0].id,
//       email: user.rows[0].email,
//       role: user.rows[0].role
//     };

//     res.status(200).json({ message: 'Login successful', user: req.session.user });

//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };