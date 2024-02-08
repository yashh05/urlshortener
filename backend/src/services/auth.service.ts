import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import sanitizedConfig from "../config/config";
import ERROR_MESSAGE from "../config/errorMessages";

export const createToken = (credential: {
  userId: mongoose.Types.ObjectId;
}): string => {
  try {
    const signature = jwt.sign(credential, sanitizedConfig.JWT_SECRET);
    return "Bearer " + signature;
  } catch (error: any) {
    console.error(error.message);
    throw ERROR_MESSAGE.JWT_SIGNING_ERROR;
  }
};
