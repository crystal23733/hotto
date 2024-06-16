import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
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

const User = mongoose.model('User', userSchema);

export default User;
