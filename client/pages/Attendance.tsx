import Layout from "@/components/layout/Layout";
import { useEffect, useMemo, useState } from "react";
import type { Student } from "./Students";

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

type AttendanceRecord = { studentId: string; present: boolean };

function loadStudents(): Student[] {
  const raw = localStorage.getItem("students");
  if (!raw) return [];
  try { const arr = JSON.parse(raw); return Array.isArray(arr) ? arr : []; } catch { return []; }
}

function loadAttendance(cls: string, date: string): AttendanceRecord[] {
  const raw = localStorage.getItem(`attendance:${cls}:${date}`);
  if (!raw) return [];
  try { const arr = JSON.parse(raw); return Array.isArray(arr) ? arr : []; } catch { return []; }
}

function saveAttendance(cls: string, date: string, items: AttendanceRecord[]) {
  localStorage.setItem(`attendance:${cls}:${date}`, JSON.stringify(items));
}

export default function Attendance() {
  const [cls, setCls] = useState<string>(CLASSES[4]);
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0,10));
  const [students, setStudents] = useState<Student[]>(() => loadStudents());
  const [items, setItems] = useState<AttendanceRecord[]>(() => loadAttendance(CLASSES[4], new Date().toISOString().slice(0,10)));

  useEffect(() => { setStudents(loadStudents()); }, []);
  useEffect(() => { setItems(loadAttendance(cls, date)); }, [cls, date]);
  useEffect(() => { saveAttendance(cls, date, items); }, [cls, date, items]);

  const classStudents = useMemo(() => students.filter(s => s.className === cls), [students, cls]);
  const presentCount = useMemo(() => items.filter(i => i.present).length, [items]);

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Attendance</h2>
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Class</label>
            <select className="rounded-md border bg-white px-2 py-1 text-sm" value={cls} onChange={(e)=>setCls(e.target.value)}>
              {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="rounded-md border bg-white px-2 py-1 text-sm" />
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="py-2">Name</th>
                <th className="py-2">Present</th>
              </tr>
            </thead>
            <tbody>
              {classStudents.map(s => {
                const rec = items.find(i => i.studentId === s.id) || { studentId: s.id, present: true };
                return (
                  <tr key={s.id} className="border-t">
                    <td className="py-2">{s.firstName} {s.lastName}</td>
                    <td className="py-2">
                      <input
                        type="checkbox"
                        checked={rec.present}
                        onChange={(e)=>{
                          const next = items.filter(i => i.studentId !== s.id);
                          next.push({ studentId: s.id, present: e.target.checked });
                          setItems(next);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-3 text-sm text-muted-foreground">
            Present: {presentCount} / {classStudents.length}
          </div>
        </div>
      </div>
    </Layout>
  );
}
