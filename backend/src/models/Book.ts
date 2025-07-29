import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String },
  isbn: { type: String, unique: true },
  copies: { type: Number, required: true },
});

export const Book = mongoose.model("Book", bookSchema);
