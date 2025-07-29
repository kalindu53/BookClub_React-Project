import React, { useState } from "react";
import { lendBook } from "../services/lendingService";

export default function LendingForm() {
  const [readerId, setReaderId] = useState("");
  const [bookId, setBookId] = useState("");

  const handleLend = async (e: React.FormEvent) => {
    e.preventDefault();
    await lendBook(readerId, bookId);
    alert("Book Lent!");
    setReaderId("");
    setBookId("");
  };

  return (
    <form onSubmit={handleLend} className="space-y-4">
      <h2 className="text-xl font-bold">📕 Lend a Book</h2>
      <input
        className="border p-2 block w-full"
        placeholder="Reader ID"
        value={readerId}
        onChange={(e) => setReaderId(e.target.value)}
        required
      />
      <input
        className="border p-2 block w-full"
        placeholder="Book ID"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Lend
      </button>
    </form>
  );
}
