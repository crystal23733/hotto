import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const userSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
  },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true, minlength: 5 },
  phone: { type: String, required: true, unique: true, trim: true },
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
