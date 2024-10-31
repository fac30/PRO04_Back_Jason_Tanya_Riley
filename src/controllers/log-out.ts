import { Request, Response } from 'express';
import 'express-session';

export const logOut = async (req: Request, res: Response): Promise<void> => {
    console.log('Logout function called'); // Log function entry
    req.session.destroy((err) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).json({ message: 'Logout failed' });
        }
        console.log('Session destroyed successfully');
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logout successful' });
    });
};
