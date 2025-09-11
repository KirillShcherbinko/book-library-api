import { model, Schema } from 'mongoose';

const bookSchema = new Schema({
  key: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  coverId: { type: String },
});

export const bookModel = model('Book', bookSchema);
