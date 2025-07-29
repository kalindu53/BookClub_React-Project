import express, { Request, Response } from "express";
import { Lending } from "../models/Lending";
import { Book } from "../models/Book";

const router = express.Router();

// POST /api/lend - Lend a book
router.post("/", async (req: Request, res: Response) => {
  const { readerId, bookId } = req.body;

  if (!readerId || !bookId) {
    return res.status(400).json({ message: "Reader ID and Book ID required" });
  }

  try {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 2 weeks later

    const lending = new Lending({ readerId, bookId, dueDate });
    await lending.save();

    res.status(201).json({ message: "Book lent successfully", lending });
  } catch (err) {
    res.status(500).json({ message: "Error lending book", error: err });
  }
});

// PUT /api/lend/return/:id - Return a book
router.put("/return/:id", async (req: Request, res: Response) => {
  try {
    const lending = await Lending.findById(req.params.id);

    if (!lending) return res.status(404).json({ message: "Lending record not found" });

    lending.returnDate = new Date();
    await lending.save();

    res.status(200).json({ message: "Book returned", lending });
  } catch (err) {
    res.status(500).json({ message: "Error returning book", error: err });
  }
});

// GET /api/lend/history - All lending history
router.get("/history", async (_req: Request, res: Response) => {
  try {
    const history = await Lending.find()
      .populate("readerId", "name email")
      .populate("bookId", "title author");
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: "Error fetching lending history", error: err });
  }
});

// GET /api/lend/overdue - Overdue books
router.get("/overdue", async (_req: Request, res: Response) => {
  try {
    const today = new Date();
    const overdue = await Lending.find({
      dueDate: { $lt: today },
      returnDate: { $exists: false }
    })
      .populate("readerId", "name email")
      .populate("bookId", "title author");

    res.status(200).json(overdue);
  } catch (err) {
    res.status(500).json({ message: "Error fetching overdue books", error: err });
  }
});

export default router;
