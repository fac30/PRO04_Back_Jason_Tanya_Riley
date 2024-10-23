// Defines the routes for signing up, logging in, and logging out
import express from 'express';

// const signup = require("../controllers/sign-up.ts");
// const login = require("../controllers/log-in.ts");
import { signUp } from "../controllers/sign-up";
import { logIn } from "../controllers/log-in";
const router = express.Router();

router.post('/sign-up', signUp);
router.post('/log-in', logIn);

export default router;



