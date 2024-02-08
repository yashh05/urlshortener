import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ERROR_MESSAGE from "../config/errorMessages";
import sanitizedConfig from "../config/config";

const authentication = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string = req.cookies.authentication;
    const jwtSecret = process.env.JWT_SECRET;

    if (!token || !token.startsWith("Bearer")) {
      throw new Error(ERROR_MESSAGE.UNAUTHORIZED_USER);
    }

    const coded = token.split(" ")[1];
    console.log(coded);

    const { userId } = jwt.verify(
      coded,
      sanitizedConfig.JWT_SECRET
    ) as JwtPayload;

    if (!userId) {
      throw new Error(ERROR_MESSAGE.UNAUTHORIZED_USER);
    }

    res.locals.userId = userId;
    next();
  } catch (err: any) {
    console.log(err);
    return res.status(401).json({ status: "fail", error: err.message });
  }
};

export default authentication;
