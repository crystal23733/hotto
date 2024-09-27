import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";
import { User } from "./user.schema";
import ICharge from "../charges/interface/charges.interface";

export type ChargeDocument = ICharge & Document;

@Schema()
export class Charge {
  @Prop({ default: 0, required: true })
  price: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  users: User;

  _id: ObjectId;
}

export const ChargeSchema = SchemaFactory.createForClass(Charge);
