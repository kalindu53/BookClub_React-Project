import { useEffect, useState } from "react";
import axios from "axios";

interface Book {
  _id?: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  copies: number;
}

export default function BookDashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState<Book>({
    title: "",
    author: "",
    category: "",
    isbn: "",
    copies: 1,
  });
  const [search, setSearch] = useState("");

  const loadBooks = async () => {
    const res = await axios.get("http://localhost:5000/api/books");
    setBooks(res.data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form._id) {
      await axios.put(`http://localhost:5000/api/books/${form._id}`, form);
    } else {
      await axios.post("http://localhost:5000/api/books", form);
    }
    setForm({ title: "", author: "", category: "", isbn: "", copies: 1 });
    loadBooks();
  };

  const handleEdit = (book: Book) => {
    setForm(book);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await axios.delete(`http://localhost:5000/api/books/${id}`);
    loadBooks();
  };

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📘 Book Dashboard</h1>

      <input
        className="border p-2 mb-4 w-1/2"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <input
            className="border p-2"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="border p-2"
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            required
          />
          <input
            className="border p-2"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            className="border p-2"
            placeholder="ISBN"
            value={form.isbn}
            onChange={(e) => setForm({ ...form, isbn: e.target.value })}
            required
          />
          <input
            className="border p-2"
            type="number"
            placeholder="Copies"
            value={form.copies}
            onChange={(e) => setForm({ ...form, copies: +e.target.value })}
            required
          />
          <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">
            {form._id ? "Update Book" : "Add Book"}
          </button>
        </div>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Author</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">ISBN</th>
            <th className="p-2 border">Copies</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((b) => (
            <tr key={b._id}>
              <td className="p-2 border">{b.title}</td>
              <td className="p-2 border">{b.author}</td>
              <td className="p-2 border">{b.category}</td>
              <td className="p-2 border">{b.isbn}</td>
              <td className="p-2 border">{b.copies}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => handleEdit(b)} className="text-blue-600">
                  Edit
                </button>
                <button onClick={() => handleDelete(b._id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
