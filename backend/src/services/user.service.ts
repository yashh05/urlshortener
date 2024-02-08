import User from "../models/userModel";

export const findUserByEmail = async (email: string) => {
  return User.findOne({ email });
};
