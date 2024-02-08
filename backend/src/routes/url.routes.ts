import express from "express";
import { addUrl, getAllUrl, redirectUrl } from "../controllers/url.controller";
import authenticationMiddleware from "../middlewares/authentication";
import { validate } from "../middlewares/validation";
import { AddUrlSchema } from "../zodSchema/url.schema";

const router = express.Router();

router.post(
  "/addUrl",
  authenticationMiddleware,
  validate(AddUrlSchema),
  addUrl
);
router.get("/getAllUrl", authenticationMiddleware, getAllUrl);
router.get("/:shortenedUrl", redirectUrl);
// router.post("/signin", validate(signinSchema), handleSignin);

export default router;
