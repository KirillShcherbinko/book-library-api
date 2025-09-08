import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  hashedPassword: { type: String, required: true },
  selectedBooks: {},
});

export const User = model('User', userSchema);
