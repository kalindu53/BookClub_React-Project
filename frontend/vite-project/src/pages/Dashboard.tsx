import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6">📊 Library Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Link to="/readers" className="bg-white p-6 rounded shadow hover:bg-blue-50">
          <h2 className="text-2xl font-semibold mb-2">📚 Readers</h2>
          <p>Manage readers: add, edit, delete, search.</p>
        </Link>

        <Link to="/books" className="bg-white p-6 rounded shadow hover:bg-green-50">
          <h2 className="text-2xl font-semibold mb-2">📖 Books</h2>
          <p>Manage books: add, update stock, etc.</p>
        </Link>

        <Link to="/lending" className="bg-white p-6 rounded shadow hover:bg-yellow-50">
          <h2 className="text-2xl font-semibold mb-2">🔄 Lending</h2>
          <p>Loan/return books, check overdue.</p>
        </Link>

        <Link to="/login" className="bg-white p-6 rounded shadow hover:bg-red-50">
          <h2 className="text-2xl font-semibold mb-2">👨‍💼 Staff Login</h2>
          <p>Authenticate staff using JWT.</p>
        </Link>
      </div>
    </div>
  );
}
