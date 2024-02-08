import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ERROR_MESSAGE from "../config/errorMessages";
import sanitizedConfig from "../config/config";

const extractToken = (req: Request): string | undefined => {
  const token: string | undefined = req.cookies.authorization;
  return token?.startsWith("Bearer") ? token.split(" ")[1] : undefined;
};

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractToken(req);
    if (!token) {
      throw new Error(ERROR_MESSAGE.UNAUTHORIZED_USER);
    }

    const decodedToken = jwt.verify(
      token,
      sanitizedConfig.JWT_SECRET
    ) as JwtPayload;
    if (!decodedToken.userId) {
      throw new Error(ERROR_MESSAGE.UNAUTHORIZED_USER);
    }

    res.locals.userId = decodedToken.userId;
    next();
  } catch (err: any) {
    console.error(err);
    return res
      .status(401)
      .json({ status: "fail", error: ERROR_MESSAGE.UNAUTHORIZED_USER });
  }
};

export default authenticationMiddleware;
