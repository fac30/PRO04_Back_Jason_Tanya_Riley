import { Request, Response } from 'express';
import { emailExists, getBuyerByValue, getBuyerByEmail } from '../models/userModel';
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
            res.status(400).send("<h1>User not found</h1>");
            return;
        }
        const match = await bcrypt.compare(password, buyer.password); 
        if (!match) {
            res.status(400).send("<h1>Login failed.</h1>");
            return;
        }
        req.session.user = {
            id: buyer.id,
            email: buyer.email,
        };
        //res.redirect('/dashboard'); // change it 

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Server error during login');
    }
};