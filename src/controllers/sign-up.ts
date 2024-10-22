import { Request, Response } from 'express';
const bcrypt = require('bcrypt');
// Import model function to insert user in the table

export const signUp = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    try {
        const hashedPass = await bcrypt.hash(password, 12);

        await createUser(username, email, hashedPass); //import from userModel.ts

        res.status(201).send('User created successfully. Please log in.');
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).send('Server error, unable to create user.');
    }
};