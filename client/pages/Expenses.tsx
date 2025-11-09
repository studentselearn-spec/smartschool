import Layout from "@/components/layout/Layout";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Expense = {
  id: string;
  date: string;
  category: string;
  amount: number;
  notes?: string;
};

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function loadExpenses(): Expense[] {
  const raw = localStorage.getItem("expenses");
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
function saveExpenses(items: Expense[]) {
  localStorage.setItem("expenses", JSON.stringify(items));
}

const CATEGORIES = [
  "Salaries",
  "Utilities",
  "Maintenance",
  "Supplies",
  "Transport",
  "Other",
];

export default function ExpensesPage() {
  const [items, setItems] = useState<Expense[]>(() => loadExpenses());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Expense>({
    id: "",
    date: new Date().toISOString().slice(0, 10),
    category: "Salaries",
    amount: 0,
    notes: "",
  });

  useEffect(() => {
    saveExpenses(items);
  }, [items]);

  const totalsByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of CATEGORIES) map[c] = 0;
    for (const e of items) map[e.category] = (map[e.category] || 0) + e.amount;
    return map;
  }, [items]);

  const monthlyData = useMemo(() => {
    const map: Record<string, number> = {};
    for (const e of items) {
      const m = e.date.slice(0, 7);
      map[m] = (map[m] || 0) + e.amount;
    }
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, total]) => ({ month, total }));
  }, [items]);

  const total = items.reduce((s, e) => s + e.amount, 0);

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Expenses</h2>
          <button
            onClick={() => {
              setForm({
                id: "",
                date: new Date().toISOString().slice(0, 10),
                category: "Salaries",
                amount: 0,
                notes: "",
              });
              setShowForm(true);
            }}
            className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm"
          >
            Add Expense
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-xl border bg-white p-4 shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="py-2">Date</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Notes</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((e) => (
                  <tr key={e.id} className="border-t">
                    <td className="py-2">{e.date}</td>
                    <td className="py-2">{e.category}</td>
                    <td className="py-2">P {e.amount.toLocaleString()}</td>
                    <td className="py-2">{e.notes}</td>
                    <td className="py-2">
                      <button
                        onClick={() =>
                          setItems(items.filter((x) => x.id !== e.id))
                        }
                        className="px-2 py-1 rounded-md border text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-sm text-muted-foreground">Totals</div>
            <div className="mt-2 text-2xl font-bold">
              P {total.toLocaleString()}
            </div>
            <div className="mt-4 space-y-2 text-sm">
              {Object.entries(totalsByCategory).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <div>{k}</div>
                  <div className="font-medium">P {v.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h3 className="font-semibold mb-2">Monthly Summary</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
            <h3 className="font-semibold mb-3">Add Expense</h3>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setItems([
                  ...items,
                  { ...form, id: uid(), amount: Number(form.amount) },
                ]);
                setShowForm(false);
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full rounded-md border px-3 py-2"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Amount (Pula)</label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.amount}
                  onChange={(e) =>
                    setForm({ ...form, amount: Number(e.target.value) })
                  }
                  required
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Notes</label>
                <input
                  value={form.notes || ""}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full rounded-md border px-3 py-2"
                  placeholder="Optional"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-3 py-2 rounded-md border"
                >
                  Cancel
                </button>
                <button className="px-3 py-2 rounded-md bg-blue-600 text-white">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
