import Layout from "@/components/layout/Layout";
import { useEffect, useMemo, useState } from "react";
import type { Student } from "./Students";

type LedgerItem = {
  id: string;
  date: string;
  amount: number;
  description: string;
  type: "invoice" | "payment";
};

type FeesState = Record<string, { items: LedgerItem[] }>; // key: studentId

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function loadStudents(): Student[] {
  const raw = localStorage.getItem("students");
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function loadFees(): FeesState {
  const raw = localStorage.getItem("fees");
  if (!raw) return {};
  try {
    const obj = JSON.parse(raw);
    return obj && typeof obj === "object" ? obj : {};
  } catch {
    return {};
  }
}
function saveFees(v: FeesState) {
  localStorage.setItem("fees", JSON.stringify(v));
}

function calcSummary(items: LedgerItem[]) {
  const invoices = items
    .filter((i) => i.type === "invoice")
    .reduce((s, i) => s + i.amount, 0);
  const payments = items
    .filter((i) => i.type === "payment")
    .reduce((s, i) => s + i.amount, 0);
  const balance = invoices - payments;
  return { invoices, payments, balance };
}

export default function Fees() {
  const [students, setStudents] = useState<Student[]>(() => loadStudents());
  const [fees, setFees] = useState<FeesState>(() => loadFees());
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [mode, setMode] = useState<"invoice" | "payment">("invoice");
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>(() =>
    new Date().toISOString().slice(0, 10),
  );

  useEffect(() => setStudents(loadStudents()), []);
  useEffect(() => saveFees(fees), [fees]);

  const filtered = useMemo(() => {
    return students.filter((s) =>
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(q.toLowerCase()),
    );
  }, [students, q]);

  function addItem(studentId: string) {
    const entry: LedgerItem = {
      id: uid(),
      date,
      amount: Number(amount),
      description,
      type: mode,
    };
    const current = fees[studentId]?.items || [];
    const next = { ...fees, [studentId]: { items: [...current, entry] } };
    setFees(next);
    setAmount(0);
    setDescription("");
  }

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Fees</h2>
          <input
            placeholder="Search student"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="py-2">Student</th>
                <th className="py-2">Class</th>
                <th className="py-2">Invoiced</th>
                <th className="py-2">Paid</th>
                <th className="py-2">Balance</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => {
                const items = fees[s.id]?.items || [];
                const { invoices, payments, balance } = calcSummary(items);
                return (
                  <tr key={s.id} className="border-t">
                    <td className="py-2">
                      {s.firstName} {s.lastName}
                    </td>
                    <td className="py-2">{s.className}</td>
                    <td className="py-2">P {invoices.toLocaleString()}</td>
                    <td className="py-2">P {payments.toLocaleString()}</td>
                    <td
                      className={`py-2 font-medium ${balance > 0 ? "text-red-600" : "text-green-700"}`}
                    >
                      P {balance.toLocaleString()}
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => setSelected(s.id)}
                        className="px-3 py-1 rounded-md border"
                      >
                        Open Ledger
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            {(() => {
              const s = students.find((x) => x.id === selected)!;
              const items = fees[selected!]?.items || [];
              const { invoices, payments, balance } = calcSummary(items);
              return (
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">
                        {s.firstName} {s.lastName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {s.className}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      className="px-3 py-2 rounded-md border"
                    >
                      Close
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <div className="text-xs text-muted-foreground">
                        Invoiced
                      </div>
                      <div className="text-lg font-bold">
                        P {invoices.toLocaleString()}
                      </div>
                    </div>
                    <div className="rounded-lg bg-green-50 p-3">
                      <div className="text-xs text-muted-foreground">Paid</div>
                      <div className="text-lg font-bold text-green-700">
                        P {payments.toLocaleString()}
                      </div>
                    </div>
                    <div className="rounded-lg bg-white border p-3">
                      <div className="text-xs text-muted-foreground">
                        Balance
                      </div>
                      <div
                        className={`text-lg font-bold ${balance > 0 ? "text-red-600" : "text-green-700"}`}
                      >
                        P {balance.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Add Entry</h4>
                    <form
                      className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
                      onSubmit={(e) => {
                        e.preventDefault();
                        addItem(selected!);
                      }}
                    >
                      <div>
                        <label className="block text-sm mb-1">Date</label>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full rounded-md border px-3 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Type</label>
                        <select
                          value={mode}
                          onChange={(e) => setMode(e.target.value as any)}
                          className="w-full rounded-md border px-3 py-2"
                        >
                          <option value="invoice">Invoice</option>
                          <option value="payment">Payment</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm mb-1">
                          Amount (Pula)
                        </label>
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          value={amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          className="w-full rounded-md border px-3 py-2"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm mb-1">
                          Description
                        </label>
                        <input
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full rounded-md border px-3 py-2"
                          placeholder="e.g., Term 3 Fees"
                        />
                      </div>
                      <button className="px-3 py-2 rounded-md bg-blue-600 text-white">
                        Add
                      </button>
                    </form>
                  </div>

                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-muted-foreground">
                          <th className="py-2">Date</th>
                          <th className="py-2">Type</th>
                          <th className="py-2">Amount</th>
                          <th className="py-2">Description</th>
                          <th className="py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items
                          .slice()
                          .sort((a, b) => a.date.localeCompare(b.date))
                          .map((i) => (
                            <tr key={i.id} className="border-t">
                              <td className="py-2">{i.date}</td>
                              <td className="py-2">
                                {i.type === "invoice" ? "Invoice" : "Payment"}
                              </td>
                              <td className="py-2">
                                P {i.amount.toLocaleString()}
                              </td>
                              <td className="py-2">{i.description}</td>
                              <td className="py-2">
                                <button
                                  onClick={() => {
                                    const next = {
                                      ...fees,
                                      [selected!]: {
                                        items: (
                                          fees[selected!]?.items || []
                                        ).filter((x) => x.id !== i.id),
                                      },
                                    };
                                    setFees(next);
                                  }}
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
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </Layout>
  );
}
