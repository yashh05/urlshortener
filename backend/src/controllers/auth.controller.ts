import { Request, Response } from "express";
import User from "../models/userModel";
import { createToken } from "../services/auth.service";
import { findUserByEmail } from "../services/user.service";
import ERROR_MESSAGE from "../config/errorMessages";
import { compare } from "bcrypt";

const handleSignup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUSer = await findUserByEmail(email);
    if (existingUSer) {
      throw new Error(ERROR_MESSAGE.USER_ALREADY_EXISTS);
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    const jwtToken = createToken({ userId: newUser._id });
    res.cookie("authorization", jwtToken, { httpOnly: true });
    res.status(201).json({ status: "success", message: "New user created" });
  } catch (e: any) {
    res.status(500).json({ status: "fail", error: e.message });
  }
};

const handleSignin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUSer = await findUserByEmail(email);
    if (!existingUSer) {
      throw new Error(ERROR_MESSAGE.WRONG_CREDENTIALS);
    }

    const isValidPassword = await compare(password, existingUSer.password);
    if (!isValidPassword) {
      throw new Error(ERROR_MESSAGE.WRONG_CREDENTIALS);
    }

    const jwtToken = createToken({ userId: existingUSer._id });
    res.cookie("authorization", jwtToken, { httpOnly: true });
    res.status(200).json({ status: "success", message: "User signed in" });
  } catch (e: any) {
    res.status(500).json({ status: "fail", error: e.message });
  }
};

export { handleSignup, handleSignin };
