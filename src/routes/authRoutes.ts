// Defines the routes for signing up, logging in, and logging out
import express from 'express';

const signup = require("./controllers/sign-up.ts");
const login = require("./controllers/log-in.ts");
const router = express.Router();

router.post('/sign-up', signup);
router.post('/log-in', login);

export default router;



