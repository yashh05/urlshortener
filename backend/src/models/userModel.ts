import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import sanitizedConfig from "../config/config";

@pre<UserSchema>("save", async function () {
  const hashpassword = await bcrypt.hash(
    this.password,
    sanitizedConfig.SALT_ROUNDS
  );
  this.password = hashpassword;
})
export class UserSchema {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;
}

const User = getModelForClass(UserSchema);

export default User;
