import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import IUser from "../users/interface/user.interface";
import bcrypt from "bcrypt";
import { Document, ObjectId, SchemaTypes } from "mongoose";

export type UserDocument = IUser & Document;
@Schema()
export class User {
  @Prop({ required: true, unique: true, trim: true, minlength: 2 })
  name: string;

  @Prop({ required: true, unique: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true, minlength: 5 })
  password: string;

  @Prop({ default: 0 })
  tokensUsedToday: number;

  @Prop({ default: 4 })
  dailyTokenLimit: number;

  @Prop({ default: 0 })
  balance: number;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: "Payment" }], default: [] })
  payments: ObjectId[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: "Order" }], default: [] })
  orders: ObjectId[];

  _id: ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>("save", async function () {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});
