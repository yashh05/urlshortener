import { Request, Response } from "express";
import User from "../models/userModel";

async function getUser(req: Request, res: Response) {
  const { userId } = res.locals;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ status: "fail", error: "user not found" });
  } else {
    const responseUser = {
      name: user.name,
      email: user.email,
    };
    res.status(200).json({ status: "success", responseUser });
  }
}

const handleLogout = (req: Request, res: Response) => {
  const { userId } = res.locals;
  res.cookie("authorization", "");
  res
    .status(200)
    .json({ status: "success", message: "User logout successfully" });
};

export { getUser, handleLogout };
