import { model, Schema } from 'mongoose';

const bookSchema = new Schema({
  key: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  categories: { type: [String], required: true },
  coverUrl: { type: String },
  isTaken: { type: Boolean, default: false },
});

export const bookModel = model('Book', bookSchema);
