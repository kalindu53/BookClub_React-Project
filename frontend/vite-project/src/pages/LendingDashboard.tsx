import { useEffect, useState } from "react";
import { getLendingHistory, returnBook, getOverdueBooks } from "../services/lendingService";
import LendingForm from "../components/LendingForm";

export default function LendingDashboard() {
  const [history, setHistory] = useState<any[]>([]);
  const [overdue, setOverdue] = useState<any[]>([]);

  const loadData = async () => {
    const h = await getLendingHistory();
    const o = await getOverdueBooks();
    setHistory(h);
    setOverdue(o);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReturn = async (id: string) => {
    await returnBook(id);
    alert("Book Returned!");
    loadData();
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">📖 Lending Dashboard</h1>

      <LendingForm />

      <div>
        <h2 className="text-2xl font-semibold mt-6">📘 Lending History</h2>
        <table className="w-full mt-2 border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Reader</th>
              <th className="p-2 border">Book</th>
              <th className="p-2 border">Due Date</th>
              <th className="p-2 border">Return Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.map((l: any) => (
              <tr key={l._id}>
                <td className="p-2 border">{l.readerId?.name}</td>
                <td className="p-2 border">{l.bookId?.title}</td>
                <td className="p-2 border">{new Date(l.dueDate).toLocaleDateString()}</td>
                <td className="p-2 border">{l.returnDate ? new Date(l.returnDate).toLocaleDateString() : "Not Returned"}</td>
                <td className="p-2 border">
                  {!l.returnDate && (
                    <button onClick={() => handleReturn(l._id)} className="text-blue-600">
                      Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mt-6 text-red-600">❗ Overdue Books</h2>
        <ul className="list-disc ml-6 mt-2 text-red-700">
          {overdue.map((o: any) => (
            <li key={o._id}>
              <strong>{o.readerId?.name}</strong> has <strong>{o.bookId?.title}</strong> overdue since{" "}
              {new Date(o.dueDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
