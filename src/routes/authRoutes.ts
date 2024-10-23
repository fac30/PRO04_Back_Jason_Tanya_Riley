// Defines the routes for signing up, logging in, and logging out
import express from 'express';
import { logOut } from '../controllers/log-out';
import { logIn } from '../controllers/log-in';
import { signUp } from '../controllers/sign-up';

// const signup = require("../controllers/sign-up.ts");
// const login = require("../controllers/log-in.ts");
import { signUp } from "../controllers/sign-up";
import { logIn } from "../controllers/log-in";
const router = express.Router();

router.post('/sign-up', signUp);
router.post('/log-in', logIn);
router.post('/log-out', logOut);

export default router;



