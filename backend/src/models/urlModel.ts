import {
  DocumentType,
  Ref,
  getModelForClass,
  pre,
  prop,
} from "@typegoose/typegoose";
import { UserSchema } from "./userModel";

export class UrlSchema {
  @prop({ required: true, unique: true })
  public url!: string;

  @prop({ required: true, unique: true })
  public shortendUrl!: string;

  @prop({ ref: () => UserSchema })
  public userId!: Ref<UserSchema>;

  @prop({ default: 0 })
  public clicks!: number;

  public async increaseClicks(this: DocumentType<UrlSchema>) {
    this.clicks + 1;
    await this.save();
  }
}

const Url = getModelForClass(UrlSchema);

export default Url;
