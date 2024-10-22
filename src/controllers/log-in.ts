import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
//import function where is checking that email is exist in table

export const logIn = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const user = getUserByEmail(email); // check the output of this function - object with all properties or just password?
    try {
        const match = await bcrypt.compare(password, user.hash); //check the naming
        if (!match) {
            return res.status(400).send("<h1>Login failed</h1>"); 
          } else {
            const sessionId = createSession(user.id); //should create this function
            res.cookie('sid', sessionId, {
              signed:true,
              maxAge: 7 * 24 * 60 * 60 * 1000,
              httpOnly: true,
              sameSite: 'lax'
            });
            res.redirect(`/confessions/${user.id}`);//wrong, needs to be change
            }

    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).send('Server error');
    }
};