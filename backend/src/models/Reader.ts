import mongoose from "mongoose";

const readerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
});

export const Reader = mongoose.model("Reader", readerSchema);
