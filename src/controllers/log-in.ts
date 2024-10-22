import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
//import function where is checking that email is exist in table

export const logIn = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const user = getUserByEmail(email); // check the output of this function - object with all properties or just password?
    try {
        if (!email || !password || !user) {
            return res.status(400).send("<h1>Login failed</h1>");
        }
        


    } catch (error) {

    }
};