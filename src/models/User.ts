import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  hashedPassword: { type: String, required: true },
  takenBooks: { type: [Schema.Types.ObjectId], ref: 'bookModel' },
});

export const userModel = model('userModel', userSchema);
