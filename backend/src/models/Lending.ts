import mongoose from "mongoose";

const lendingSchema = new mongoose.Schema({
  readerId: { type: mongoose.Schema.Types.ObjectId, ref: "Reader", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  lendDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
});

export const Lending = mongoose.model("Lending", lendingSchema);
