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