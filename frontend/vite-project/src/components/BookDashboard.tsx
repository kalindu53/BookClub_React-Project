import { useEffect, useState } from 'react';
import { getBooks, addBook, updateBook, deleteBook } from '../services/bookService';

export default function BookDashboard() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', isbn: '', id: null });

  const loadBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (form.id) {
      await updateBook(form.id, form);
    } else {
      await addBook(form);
    }
    setForm({ title: '', author: '', isbn: '', id: null });
    loadBooks();
  };

  const handleEdit = (book: any) => {
    setForm({ ...book, id: book._id });
  };

  const handleDelete = async (id: string) => {
    await deleteBook(id);
    loadBooks();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">📚 Book Dashboard</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <div className="flex gap-4">
          <input
            className="border p-2 flex-1"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="border p-2 flex-1"
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            required
          />
          <input
            className="border p-2 flex-1"
            placeholder="ISBN"
            value={form.isbn}
            onChange={(e) => setForm({ ...form, isbn: e.target.value })}
            required
          />
          <button className="bg-green-600 text-white px-4 rounded" type="submit">
            {form.id ? 'Update' : 'Add'}
          </button>
        </div>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Author</th>
            <th className="p-2 border">ISBN</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b: any) => (
            <tr key={b._id}>
              <td className="p-2 border">{b.title}</td>
              <td className="p-2 border">{b.author}</td>
              <td className="p-2 border">{b.isbn}</td>
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
