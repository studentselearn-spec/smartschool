import Layout from "@/components/layout/Layout";
import type { Student } from "./Students";

function downloadFile(
  filename: string,
  content: string,
  type = "text/csv;charset=utf-8;",
) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function csvRow(values: (string | number)[]) {
  return values.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");
}

function exportStudents() {
  const raw = localStorage.getItem("students");
  const students: Student[] = raw ? JSON.parse(raw) : [];
  const header = csvRow([
    "Admission No",
    "First Name",
    "Last Name",
    "Gender",
    "DOB",
    "Class",
    "Guardian",
    "Contact",
    "Date Admitted",
  ]);
  const rows = students.map((s) =>
    csvRow([
      s.admissionNo,
      s.firstName,
      s.lastName,
      s.gender,
      s.dob,
      s.className,
      s.guardianName,
      s.contact,
      s.dateAdmitted,
    ]),
  );
  downloadFile("students.csv", [header, ...rows].join("\n"));
}

function exportFeesSummary() {
  const raw = localStorage.getItem("fees");
  const fees = raw ? JSON.parse(raw) : {};
  const sraw = localStorage.getItem("students");
  const students: Student[] = sraw ? JSON.parse(sraw) : [];
  const mapName: Record<string, string> = {};
  const mapClass: Record<string, string> = {};
  for (const s of students) {
    mapName[s.id] = `${s.firstName} ${s.lastName}`;
    mapClass[s.id] = s.className;
  }

  const header = csvRow(["Student", "Class", "Invoiced", "Paid", "Balance"]);
  const rows: string[] = [];
  for (const id of Object.keys(fees)) {
    const items = fees[id].items as {
      type: "invoice" | "payment";
      amount: number;
    }[];
    const invoices = items
      .filter((i) => i.type === "invoice")
      .reduce((s, i) => s + i.amount, 0);
    const payments = items
      .filter((i) => i.type === "payment")
      .reduce((s, i) => s + i.amount, 0);
    const balance = invoices - payments;
    rows.push(
      csvRow([
        mapName[id] || id,
        mapClass[id] || "",
        invoices,
        payments,
        balance,
      ]),
    );
  }
  downloadFile("fees-summary.csv", [header, ...rows].join("\n"));
}

function exportAttendance() {
  const sraw = localStorage.getItem("students");
  const students: Student[] = sraw ? JSON.parse(sraw) : [];
  const classes = Array.from(new Set(students.map((s) => s.className)));
  const dates = new Set<string>();
  // collect all dates in attendance
  for (const key in localStorage) {
    if (key.startsWith("attendance:")) {
      const parts = key.split(":");
      dates.add(parts[2]);
    }
  }
  const header = csvRow(["Class", "Date", "Student", "Present"]);
  const rows: string[] = [];
  for (const d of Array.from(dates).sort()) {
    for (const c of classes) {
      const raw = localStorage.getItem(`attendance:${c}:${d}`);
      if (!raw) continue;
      const arr: { studentId: string; present: boolean }[] = JSON.parse(raw);
      for (const rec of arr) {
        const s = students.find((x) => x.id === rec.studentId);
        if (!s) continue;
        rows.push(
          csvRow([
            c,
            d,
            `${s.firstName} ${s.lastName}`,
            rec.present ? "Yes" : "No",
          ]),
        );
      }
    }
  }
  downloadFile("attendance.csv", [header, ...rows].join("\n"));
}

function exportStaffPerformance() {
  const perfRaw = localStorage.getItem("staffPerformance");
  const perf = perfRaw ? JSON.parse(perfRaw) : {};
  const staffRaw = localStorage.getItem("staff");
  const staff = staffRaw
    ? JSON.parse(staffRaw)
    : ([] as { id: string; name: string }[]);
  const mapName: Record<string, string> = {};
  for (const s of staff) mapName[s.id] = s.name;
  const header = csvRow(["Staff", "Rating", "Notes", "Updated At"]);
  const rows = Object.keys(perf).map((id) =>
    csvRow([
      mapName[id] || id,
      perf[id].rating,
      perf[id].notes || "",
      new Date(perf[id].updatedAt).toLocaleString(),
    ]),
  );
  downloadFile("staff-performance.csv", [header, ...rows].join("\n"));
}

export default function Reports() {
  return (
    <Layout>
      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-3">
        <h2 className="text-xl font-semibold mb-2">Reports</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <button
            onClick={exportStudents}
            className="px-4 py-3 rounded-md border text-left hover:bg-sky-50"
          >
            <div className="font-semibold">Export Students</div>
            <div className="text-xs text-muted-foreground">
              CSV with admission and profile details
            </div>
          </button>
          <button
            onClick={exportAttendance}
            className="px-4 py-3 rounded-md border text-left hover:bg-sky-50"
          >
            <div className="font-semibold">Export Attendance</div>
            <div className="text-xs text-muted-foreground">
              CSV for all classes and dates
            </div>
          </button>
          <button
            onClick={exportFeesSummary}
            className="px-4 py-3 rounded-md border text-left hover:bg-sky-50"
          >
            <div className="font-semibold">Export Fees Summary</div>
            <div className="text-xs text-muted-foreground">
              Invoices, payments and balances
            </div>
          </button>
          <button
            onClick={exportStaffPerformance}
            className="px-4 py-3 rounded-md border text-left hover:bg-sky-50"
          >
            <div className="font-semibold">Export Staff Performance</div>
            <div className="text-xs text-muted-foreground">
              Ratings and notes
            </div>
          </button>
        </div>
      </div>
    </Layout>
  );
}
