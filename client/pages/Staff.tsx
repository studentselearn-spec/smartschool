import Layout from "@/components/layout/Layout";
import { useEffect, useMemo, useState } from "react";

type Staff = {
  id: string;
  name: string;
  role: string;
  department: string;
  contact: string;
};

type AttendanceEntry = { staffId: string; present: boolean };

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function loadStaff(): Staff[] {
  const raw = localStorage.getItem("staff");
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveStaff(list: Staff[]) {
  localStorage.setItem("staff", JSON.stringify(list));
}

function saveStaffAttendance(date: string, items: AttendanceEntry[]) {
  localStorage.setItem(`staffAttendance:${date}`, JSON.stringify(items));
}

function loadStaffAttendance(date: string): AttendanceEntry[] {
  const raw = localStorage.getItem(`staffAttendance:${date}`);
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function loadPerformance(): Record<string, { rating: number; notes?: string; updatedAt: string }>
{
  const raw = localStorage.getItem("staffPerformance");
  if (!raw) return {};
  try {
    const obj = JSON.parse(raw);
    return obj && typeof obj === "object" ? obj : {};
  } catch {
    return {};
  }
}

function savePerformance(v: Record<string, { rating: number; notes?: string; updatedAt: string }>) {
  localStorage.setItem("staffPerformance", JSON.stringify(v));
}

export default function StaffPage() {
  const [tab, setTab] = useState<"records" | "attendance" | "performance">("records");
  const [staff, setStaff] = useState<Staff[]>(() => loadStaff());
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Staff>({ id: "", name: "", role: "", department: "", contact: "" });
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [attendance, setAttendance] = useState<AttendanceEntry[]>(() => loadStaffAttendance(new Date().toISOString().slice(0,10)));
  const [performance, setPerformance] = useState(loadPerformance());

  useEffect(() => { saveStaff(staff); }, [staff]);

  useEffect(() => { setAttendance(loadStaffAttendance(date)); }, [date]);
  useEffect(() => { saveStaffAttendance(date, attendance); }, [date, attendance]);
  useEffect(() => { savePerformance(performance); }, [performance]);

  const presentCount = useMemo(() => attendance.filter(a => a.present).length, [attendance]);

  function openNew() {
    setEditing(null);
    setForm({ id: "", name: "", role: "", department: "", contact: "" });
    setShowForm(true);
  }
  function openEdit(s: Staff) {
    setEditing(s.id);
    setForm(s);
    setShowForm(true);
  }

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Staff</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setTab("records")} className={`px-3 py-1 rounded-md border text-sm ${tab==="records"?"bg-blue-600 text-white":"bg-white"}`}>Records</button>
            <button onClick={() => setTab("attendance")} className={`px-3 py-1 rounded-md border text-sm ${tab==="attendance"?"bg-blue-600 text-white":"bg-white"}`}>Attendance</button>
            <button onClick={() => setTab("performance")} className={`px-3 py-1 rounded-md border text-sm ${tab==="performance"?"bg-blue-600 text-white":"bg-white"}`}>Performance</button>
          </div>
        </div>

        {tab === "records" && (
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm text-muted-foreground">Add and manage teachers and staff</div>
              <button onClick={openNew} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">Add Staff</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="py-2">Name</th>
                    <th className="py-2">Role</th>
                    <th className="py-2">Department</th>
                    <th className="py-2">Contact</th>
                    <th className="py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((s) => (
                    <tr key={s.id} className="border-t">
                      <td className="py-2">{s.name}</td>
                      <td className="py-2">{s.role}</td>
                      <td className="py-2">{s.department}</td>
                      <td className="py-2">{s.contact}</td>
                      <td className="py-2">
                        <div className="flex gap-2">
                          <button onClick={() => openEdit(s)} className="px-2 py-1 rounded-md border">Edit</button>
                          <button onClick={() => setStaff(staff.filter(x => x.id !== s.id))} className="px-2 py-1 rounded-md border text-red-600">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "attendance" && (
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-muted-foreground">Mark daily attendance</div>
              <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="rounded-md border px-2 py-1 text-sm" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="py-2">Name</th>
                    <th className="py-2">Role</th>
                    <th className="py-2">Present</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((s) => {
                    const rec = attendance.find(a => a.staffId === s.id) || { staffId: s.id, present: true };
                    return (
                      <tr key={s.id} className="border-t">
                        <td className="py-2">{s.name}</td>
                        <td className="py-2">{s.role}</td>
                        <td className="py-2">
                          <input
                            type="checkbox"
                            checked={rec.present}
                            onChange={(e)=>{
                              const next = attendance.filter(a => a.staffId !== s.id);
                              next.push({ staffId: s.id, present: e.target.checked });
                              setAttendance(next);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">Present: {presentCount} / {staff.length}</div>
          </div>
        )}

        {tab === "performance" && (
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-sm text-muted-foreground mb-3">Update performance ratings (1-5) and notes</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="py-2">Name</th>
                    <th className="py-2">Rating</th>
                    <th className="py-2">Notes</th>
                    <th className="py-2">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((s) => {
                    const perf = performance[s.id] || { rating: 3, notes: "", updatedAt: new Date().toISOString() };
                    return (
                      <tr key={s.id} className="border-t">
                        <td className="py-2">{s.name}</td>
                        <td className="py-2">
                          <select
                            value={perf.rating}
                            onChange={(e)=> setPerformance({ ...performance, [s.id]: { ...perf, rating: Number(e.target.value), updatedAt: new Date().toISOString() } })}
                            className="rounded-md border px-2 py-1"
                          >
                            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </td>
                        <td className="py-2">
                          <input
                            value={perf.notes || ""}
                            onChange={(e)=> setPerformance({ ...performance, [s.id]: { ...perf, notes: e.target.value, updatedAt: new Date().toISOString() } })}
                            className="w-full rounded-md border px-2 py-1"
                            placeholder="Notes"
                          />
                        </td>
                        <td className="py-2 text-xs text-muted-foreground">{new Date(perf.updatedAt).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
            <h3 className="font-semibold mb-3">{editing ? "Edit Staff" : "Add Staff"}</h3>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (editing) {
                  setStaff(staff.map(s => s.id === editing ? form : s));
                } else {
                  setStaff([...staff, { ...form, id: uid() }]);
                }
                setShowForm(false);
              }}
            >
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input value={form.name} onChange={(e)=>setForm({ ...form, name: e.target.value })} required className="w-full rounded-md border px-3 py-2" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">Role</label>
                  <input value={form.role} onChange={(e)=>setForm({ ...form, role: e.target.value })} required className="w-full rounded-md border px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Department</label>
                  <input value={form.department} onChange={(e)=>setForm({ ...form, department: e.target.value })} className="w-full rounded-md border px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Contact</label>
                <input value={form.contact} onChange={(e)=>setForm({ ...form, contact: e.target.value })} className="w-full rounded-md border px-3 py-2" />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={()=>setShowForm(false)} className="px-3 py-2 rounded-md border">Cancel</button>
                <button className="px-3 py-2 rounded-md bg-blue-600 text-white">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
