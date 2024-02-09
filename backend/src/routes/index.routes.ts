import express from "express";
import AuthRouter from "./auth.routes";
import UrlRouter from "./url.routes";
import UserRouter from "./user.routes";
const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/url", UrlRouter);
router.use("/user", UserRouter);
export default router;
