import { model, Schema } from 'mongoose';

const tokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

export const tokenModel = model('Token', tokenSchema);
