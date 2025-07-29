import express, { Request, Response } from "express";
import { Book } from "../models/Book";

const router = express.Router();

// POST /api/books - Add a new book
router.post("/", async (req: Request, res: Response) => {
  const { title, author, category, isbn, copies } = req.body;

  if (!title || !author || !copies) {
    return res.status(400).json({ message: "Title, author, and copies are required" });
  }

  try {
    const existing = await Book.findOne({ isbn });
    if (existing) return res.status(409).json({ message: "Book with same ISBN exists" });

    const book = new Book({ title, author, category, isbn, copies });
    await book.save();

    res.status(201).json({ message: "Book added", book });
  } catch (err) {
    res.status(500).json({ message: "Error adding book", error: err });
  }
});

// GET /api/books - Get all books
router.get("/", async (_req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books", error: err });
  }
});

// PUT /api/books/:id - Update book
router.put("/:id", async (req: Request, res: Response) => {
  const { title, author, category, isbn, copies } = req.body;

  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, category, isbn, copies },
      { new: true }
    );

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book updated", book });
  } catch (err) {
    res.status(500).json({ message: "Error updating book", error: err });
  }
});

// DELETE /api/books/:id - Delete book
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting book", error: err });
  }
});

export default router;
