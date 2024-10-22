import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
// Import model function to insert user in the table

export const signUp = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;
    try {
        const hashedPass = await bcrypt.hash(password, 12);

        // insert a new user in DB

        res.status(201).send('User created');
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).send('Server error');
    }
};