import { Request, Response } from 'express';
import { createBuyer } from '../models/userModel';
const bcrypt = require('bcrypt');

export const signUp = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    try {
        const hashedPass = await bcrypt.hash(password, 12);

        await createBuyer(username, email, hashedPass); //import from userModel.ts

        res.status(201).send('User created successfully. Please log in.');
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).send('Server error, unable to create user.');
    }
};