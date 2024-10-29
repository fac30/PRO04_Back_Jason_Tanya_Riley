import { Request, Response } from 'express';
import 'express-session';

export const logOut = async (req: Request, res: Response): Promise<void> => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).json({ message: 'Logout failed' });
        }     
        res.clearCookie('connect.sid'); // Clears the session cookie from the client
        res.status(200).json({ message: 'Logout successful' });
    });
};
