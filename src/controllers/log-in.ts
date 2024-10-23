import { Request, Response } from 'express';
const bcrypt = require('bcrypt');
import { createSession } from '../models/sessionModel'; 
import { emailExists } from '../models/userModel';
//import function where is checking that email is exist in table

export const logIn = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await emailExists(email);

        if (!user) {
            res.status(400).send("<h1>User not found</h1>");
            return;
        }

        const match = await bcrypt.compare(password, user.password); 

        if (!match) {
            res.status(400).send("<h1>Login failed</h1>");
            return;
        }
        const sessionId = await createSession(user.id);
        res.cookie('sid', sessionId, {
            signed: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'lax'
        });
        res.redirect(`/dashboard`); // change when will be ready

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Server error during login');
    }
};