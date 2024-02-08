import express from "express";
import AuthRouter from "./auth.routes";
import UrlRouter from "./url.routes";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/url", UrlRouter);
export default router;
