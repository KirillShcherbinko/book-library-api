import { Schema } from 'mongoose';

const bookSchema = new Schema({
  id: { type: String, unique: true, required: true },
  title: { type: String, required: true },
});
