import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError, ZodIssue } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const pathError = error.errors.map((singleError: ZodIssue) => {
          console.log(singleError.path[0], singleError.message);
          const path = singleError.path[0].toString();

          const newError = {
            path,
            patherror: singleError.message,
          };

          return newError;
        });

        return res.status(400).json({
          status: "fail",
          type: "ZodError",
          error: pathError,
        });
      } else {
        res.status(400).json({ status: "fail", error: error.message });
      }
    }
  };
