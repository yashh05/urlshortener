import express from "express";
import { handleSignin, handleSignup } from "../controllers/auth.controller";
import { validate } from "../middlewares/validation";
import { signinSchema, signupSchema } from "../schema/auth.schema";

const router = express.Router();

router.post("/signup", validate(signupSchema), handleSignup);
router.post("/signin", validate(signinSchema), handleSignin);

export default router;
