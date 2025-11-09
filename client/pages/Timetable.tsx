import Layout from "@/components/layout/Layout";
import { useEffect, useMemo, useState } from "react";

const CLASSES = [
  "Grade 1 - A",
  "Grade 1 - B",
  "Grade 2 - A",
  "Grade 3 - A",
  "Grade 4 - A",
  "Grade 5 - A",
  "Grade 6 - A",
  "Grade 7 - A",
  "Form 1 - A",
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
const PERIODS = [1, 2, 3, 4, 5, 6];

type Cell = { subject: string; teacher?: string };

type TimetableData = Record<typeof DAYS[number], Cell[]>;

function loadTimetable(cls: string): TimetableData {
  const key = `timetable:${cls}`;
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      // ensure proper shape
      const result: TimetableData = {
        Mon: Array.isArray(parsed.Mon) ? parsed.Mon : Array(PERIODS.length).fill({ subject: "" }),
        Tue: Array.isArray(parsed.Tue) ? parsed.Tue : Array(PERIODS.length).fill({ subject: "" }),
        Wed: Array.isArray(parsed.Wed) ? parsed.Wed : Array(PERIODS.length).fill({ subject: "" }),
        Thu: Array.isArray(parsed.Thu) ? parsed.Thu : Array(PERIODS.length).fill({ subject: "" }),
        Fri: Array.isArray(parsed.Fri) ? parsed.Fri : Array(PERIODS.length).fill({ subject: "" }),
      };
      return result;
    } catch {}
  }
  return {
    Mon: Array(PERIODS.length).fill({ subject: "" }),
    Tue: Array(PERIODS.length).fill({ subject: "" }),
    Wed: Array(PERIODS.length).fill({ subject: "" }),
    Thu: Array(PERIODS.length).fill({ subject: "" }),
    Fri: Array(PERIODS.length).fill({ subject: "" }),
  };
}

function saveTimetable(cls: string, data: TimetableData) {
  localStorage.setItem(`timetable:${cls}`, JSON.stringify(data));
}

export default function Timetable() {
  const [cls, setCls] = useState(CLASSES[4]);
  const [data, setData] = useState<TimetableData>(() => loadTimetable(CLASSES[4]));
  const [editing, setEditing] = useState<{ day: keyof TimetableData; periodIdx: number } | null>(
    null,
  );
  const [form, setForm] = useState<{ subject: string; teacher: string }>({ subject: "", teacher: "" });

  useEffect(() => {
    setData(loadTimetable(cls));
  }, [cls]);

  useEffect(() => {
    saveTimetable(cls, data);
  }, [cls, data]);

  const grid = useMemo(() => {
    return DAYS.map((d) => ({ day: d, periods: data[d] }));
  }, [data]);

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Timetable</h2>
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Class</label>
            <select
              className="rounded-md border bg-white px-2 py-1 text-sm"
              value={cls}
              onChange={(e) => setCls(e.target.value)}
            >
              {CLASSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-3 py-2 text-left">Day</th>
                {PERIODS.map((p) => (
                  <th key={p} className="px-3 py-2 text-left">
                    Period {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grid.map((row) => (
                <tr key={row.day} className="border-t">
                  <td className="px-3 py-2 font-medium text-slate-700">{row.day}</td>
                  {row.periods.map((cell, i) => (
                    <td key={i} className="px-3 py-2">
                      <button
                        onClick={() => {
                          setEditing({ day: row.day, periodIdx: i });
                          setForm({ subject: cell.subject, teacher: cell.teacher || "" });
                        }}
                        className={`w-full text-left rounded-md border px-2 py-2 hover:bg-sky-50 ${
                          cell.subject ? "bg-white" : "bg-slate-50 text-muted-foreground"
                        }`}
                      >
                        <div className="font-medium">{cell.subject || "Set Subject"}</div>
                        <div className="text-xs text-muted-foreground">
                          {cell.teacher ? `Teacher: ${cell.teacher}` : ""}
                        </div>
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
              <h3 className="font-semibold mb-3">Update Period</h3>
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  const next = { ...data };
                  const arr = [...next[editing.day]];
                  arr[editing.periodIdx] = { subject: form.subject, teacher: form.teacher };
                  const merged = { ...next, [editing.day]: arr } as TimetableData;
                  setData(merged);
                  setEditing(null);
                }}
              >
                <div>
                  <label className="block text-sm mb-1">Subject</label>
                  <input
                    value={form.subject}
                    onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))}
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="Mathematics"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Teacher</label>
                  <input
                    value={form.teacher}
                    onChange={(e) => setForm((s) => ({ ...s, teacher: e.target.value }))}
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="Ms. Dube"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setEditing(null)} className="px-3 py-2 rounded-md border">
                    Cancel
                  </button>
                  <button className="px-3 py-2 rounded-md bg-blue-600 text-white">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
