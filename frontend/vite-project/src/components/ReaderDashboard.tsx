import { useEffect, useState } from "react";
import {
  getReaders,
  addReader,
  updateReader,
  deleteReader
} from "../services/readerService";
import React from "react";

export default function ReaderDashboard() {
  const [readers, setReaders] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", mobile: "", id: null });
  const [search, setSearch] = useState("");

  const loadReaders = async () => {
    const data = await getReaders(search);
    setReaders(data);
  };

  useEffect(() => {
    loadReaders();
  }, [search]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (form.id) {
      await updateReader(form.id, form);
    } else {
      await addReader(form);
    }
    setForm({ name: "", email: "", mobile: "", id: null });
    loadReaders();
  };

  const handleEdit = (reader: any) => {
    setForm({ ...reader, id: reader._id });
  };

  const handleDelete = async (id: string) => {
    await deleteReader(id);
    loadReaders();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">📚 Reader Dashboard</h1>

      <input
        className="border p-2 mb-4 w-1/2"
        placeholder="Search readers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <div className="flex gap-4">
          <input
            className="border p-2 flex-1"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="border p-2 flex-1"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="border p-2 flex-1"
            placeholder="Mobile"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            required
          />
          <button className="bg-blue-600 text-white px-4 rounded" type="submit">
            {form.id ? "Update" : "Add"}
          </button>
        </div>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Mobile</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {readers.map((r: any) => (
            <tr key={r._id}>
              <td className="p-2 border">{r.name}</td>
              <td className="p-2 border">{r.email}</td>
              <td className="p-2 border">{r.mobile}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => handleEdit(r)} className="text-blue-600">
                  Edit
                </button>
                <button onClick={() => handleDelete(r._id)} className="text-red-600">
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
