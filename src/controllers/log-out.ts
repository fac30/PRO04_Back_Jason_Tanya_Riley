import { Request, Response } from 'express';
import 'express-session';

export const logOut = async (req: Request, res: Response): Promise<void> => {
    try {
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error destroying session:', err);
                    res.status(500).send('Failed to log out. Please try again.');
                } else {
                    res.clearCookie('connect.sid');
                    res.redirect('/');
                }
            });
        } else {
            res.status(400).send('No session found');
        }
    } catch (error) {
        console.error('Error during logOut:', error);
        res.status(500).send('Server error during log out');
    }
};