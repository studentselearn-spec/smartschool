import Layout from "@/components/layout/Layout";
import { useEffect, useMemo, useState } from "react";

export type Student = {
  id: string;
  admissionNo: string;
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Other";
  dob: string;
  className: string;
  guardianName: string;
  contact: string;
  dateAdmitted: string;
};

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

function saveStudents(items: Student[]) {
  localStorage.setItem("students", JSON.stringify(items));
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>(() => loadStudents());
  const [q, setQ] = useState("");
  const [cls, setCls] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Student>({
    id: "",
    admissionNo: "",
    firstName: "",
    lastName: "",
    gender: "Male",
    dob: "",
    className: CLASSES[4],
    guardianName: "",
    contact: "",
    dateAdmitted: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    saveStudents(students);
  }, [students]);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesQ = `${s.firstName} ${s.lastName} ${s.admissionNo}`
        .toLowerCase()
        .includes(q.toLowerCase());
      const matchesClass = !cls || s.className === cls;
      return matchesQ && matchesClass;
    });
  }, [students, q, cls]);

  function openAdd() {
    setEditing(null);
    setForm({
      id: "",
      admissionNo: "",
      firstName: "",
      lastName: "",
      gender: "Male",
      dob: "",
      className: CLASSES[4],
      guardianName: "",
      contact: "",
      dateAdmitted: new Date().toISOString().slice(0, 10),
    });
    setShowForm(true);
  }

  function openEdit(s: Student) {
    setEditing(s.id);
    setForm(s);
    setShowForm(true);
  }

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Students</h2>
          <button
            onClick={openAdd}
            className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm"
          >
            Add Student
          </button>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <input
              placeholder="Search by name or admission no."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="flex-1 rounded-md border px-3 py-2"
            />
            <select
              className="rounded-md border px-3 py-2"
              value={cls}
              onChange={(e) => setCls(e.target.value)}
            >
              <option value="">All Classes</option>
              {CLASSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="py-2">Adm No.</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Gender</th>
                  <th className="py-2">DOB</th>
                  <th className="py-2">Class</th>
                  <th className="py-2">Guardian</th>
                  <th className="py-2">Contact</th>
                  <th className="py-2">Admitted</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-t">
                    <td className="py-2">{s.admissionNo}</td>
                    <td className="py-2">
                      {s.firstName} {s.lastName}
                    </td>
                    <td className="py-2">{s.gender}</td>
                    <td className="py-2">{s.dob}</td>
                    <td className="py-2">{s.className}</td>
                    <td className="py-2">{s.guardianName}</td>
                    <td className="py-2">{s.contact}</td>
                    <td className="py-2">{s.dateAdmitted}</td>
                    <td className="py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(s)}
                          className="px-2 py-1 rounded-md border"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            setStudents(students.filter((x) => x.id !== s.id))
                          }
                          className="px-2 py-1 rounded-md border text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-2xl rounded-xl bg-white p-5 shadow-xl">
            <h3 className="font-semibold mb-3">
              {editing ? "Edit Student" : "Add Student"}
            </h3>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (editing) {
                  setStudents(
                    students.map((x) => (x.id === editing ? form : x)),
                  );
                } else {
                  setStudents([...students, { ...form, id: uid() }]);
                }
                setShowForm(false);
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm mb-1">Admission No.</label>
                  <input
                    value={form.admissionNo}
                    onChange={(e) =>
                      setForm({ ...form, admissionNo: e.target.value })
                    }
                    required
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">First Name</label>
                  <input
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                    required
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Last Name</label>
                  <input
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                    required
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm mb-1">Gender</label>
                  <select
                    value={form.gender}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        gender: e.target.value as Student["gender"],
                      })
                    }
                    className="w-full rounded-md border px-3 py-2"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={form.dob}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    required
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Class</label>
                  <select
                    value={form.className}
                    onChange={(e) =>
                      setForm({ ...form, className: e.target.value })
                    }
                    className="w-full rounded-md border px-3 py-2"
                  >
                    {CLASSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm mb-1">Guardian Name</label>
                  <input
                    value={form.guardianName}
                    onChange={(e) =>
                      setForm({ ...form, guardianName: e.target.value })
                    }
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Contact</label>
                  <input
                    value={form.contact}
                    onChange={(e) =>
                      setForm({ ...form, contact: e.target.value })
                    }
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Date Admitted</label>
                  <input
                    type="date"
                    value={form.dateAdmitted}
                    onChange={(e) =>
                      setForm({ ...form, dateAdmitted: e.target.value })
                    }
                    required
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>
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
