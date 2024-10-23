import { Request, Response } from 'express';
import { createSession } from '../models/sessionModel'; 
import { emailExists, getBuyerByValue } from '../models/userModel';
const SQLiteStore = require('connect-sqlite3')/* (session) */;
const sessionExp = require('express-session');
const bcrypt = require('bcrypt');


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

        const sessionId = await createSession(buyer.id);
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