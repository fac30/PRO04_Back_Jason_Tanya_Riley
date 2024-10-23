import { Request, Response } from 'express';
import { emailExists } from '../models/userModel';
import 'express-session';
const bcrypt = require('bcrypt');

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
        const buyerExists = await emailExists(email);

        if (!buyerExists) {
            res.status(400).send("<h1>User not found</h1>");
            return;
        }
				const buyer = await getBuyerByValue(email);

        const match = await bcrypt.compare(password, buyer.password); 

        if (!match) {
            res.status(400).send("<h1>Login failed</h1>");
            return;
        }
        req.session.user = {
            id: user.id,
            email: user.email,
        };
        //res.redirect('/dashboard'); // change it 

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Server error during login');
    }
};