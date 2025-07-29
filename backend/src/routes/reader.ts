import express, { Request, Response } from "express";
import { Reader } from "../models/Reader";

const router = express.Router();

// POST /api/readers - Register new reader
router.post("/", async (req: Request, res: Response) => {
  const { name, email, mobile } = req.body;

  if (!name || !email || !mobile) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existing = await Reader.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Reader already exists" });
    }

    const reader = new Reader({ name, email, mobile });
    await reader.save();

    res.status(201).json({ message: "Reader registered", reader });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});


// GET /api/readers - Get all readers
router.get("/", async (req: Request, res: Response) => {
    try {
      const readers = await Reader.find();
      res.status(200).json(readers);
    } catch (err) {
      res.status(500).json({ message: "Error fetching readers", error: err });
    }
  });


  // PUT /api/readers/:id - Update a reader
router.put("/:id", async (req: Request, res: Response) => {
    const { name, email, mobile } = req.body;
  
    if (!name || !email || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const reader = await Reader.findByIdAndUpdate(
        req.params.id,
        { name, email, mobile },
        { new: true }
      );
  
      if (!reader) {
        return res.status(404).json({ message: "Reader not found" });
      }
  
      res.status(200).json({ message: "Reader updated", reader });
    } catch (err) {
      res.status(500).json({ message: "Error updating reader", error: err });
    }
  });

  
  // DELETE /api/readers/:id - Delete a reader
router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const deleted = await Reader.findByIdAndDelete(req.params.id);
  
      if (!deleted) {
        return res.status(404).json({ message: "Reader not found" });
      }
  
      res.status(200).json({ message: "Reader deleted" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting reader", error: err });
    }
  });
  

  // GET /api/readers?search=keyword
router.get("/", async (req: Request, res: Response) => {
    const search = req.query.search as string;
  
    try {
      let query = {};
  
      if (search) {
        query = {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { mobile: { $regex: search, $options: "i" } }
          ]
        };
      }
  
      const readers = await Reader.find(query);
      res.status(200).json(readers);
    } catch (err) {
      res.status(500).json({ message: "Error fetching readers", error: err });
    }
  });
  
  

export default router;
