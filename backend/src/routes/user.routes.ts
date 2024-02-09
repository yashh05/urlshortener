import express from "express";
import { addUrl, getAllUrl, redirectUrl } from "../controllers/url.controller";
import authenticationMiddleware from "../middlewares/authentication";
import { validate } from "../middlewares/validation";
import { AddUrlSchema } from "../zodSchema/url.schema";
import { getUser, handleLogout } from "../controllers/user.controller";

const router = express.Router();

router.post(
  "/addUrl",
  authenticationMiddleware,
  validate(AddUrlSchema),
  addUrl
);
router.get("/getUser", authenticationMiddleware, getUser);
router.get("/logout", authenticationMiddleware, handleLogout);

export default router;
