import Layout from "@/components/layout/Layout";
import { getDefaultBranding } from "@/lib/branding";
import { useState } from "react";

export default function ParentPortal() {
  const branding = getDefaultBranding(window);
  const [view, setView] = useState<"parent" | "student">("parent");

  const child = {
    name: "Tebogo Kgosi",
    class: "Grade 5 - A",
    attendancePercent: 92,
    feesDue: 450,
    feesPaid: 1550,
    messages: [
      { id: 1, from: "Mrs. Molefe", text: "Reminder: PTA meeting this Friday.", time: "2 days ago" },
      { id: 2, from: "Accounts", text: "School fees for Term 3 are due.", time: "1 week ago" },
    ],
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-muted-foreground">{branding.schoolName}</div>
                <h2 className="text-2xl font-semibold mt-1">{child.name}</h2>
                <div className="text-sm text-muted-foreground">{child.class}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Attendance</div>
                  <div className="text-2xl font-bold text-slate-800">{child.attendancePercent}%</div>
                </div>
                <div>
                  <button
                    onClick={() => setView(view === "parent" ? "student" : "parent")}
                    className="px-3 py-2 rounded-md border text-sm"
                  >
                    View as {view === "parent" ? "Student" : "Parent"}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="text-sm text-muted-foreground">Fees Paid</div>
                <div className="text-xl font-bold">P {child.feesPaid}</div>
              </div>
              <div className="rounded-lg bg-white p-4 border">
                <div className="text-sm text-muted-foreground">Amount Due</div>
                <div className="text-xl font-bold text-red-600">P {child.feesDue}</div>
              </div>
              <div className="rounded-lg bg-white p-4 border">
                <div className="text-sm text-muted-foreground">Next Payment</div>
                <div className="text-sm">Due in 14 days</div>
                <div className="mt-2">
                  <button className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">Pay Now</button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Recent Messages</h3>
              <div className="space-y-3">
                {child.messages.map((m) => (
                  <div key={m.id} className="rounded-md border bg-white p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{m.from}</div>
                        <div className="text-sm text-muted-foreground">{m.text}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="font-semibold mb-3">Attendance (Last 7 Days)</h3>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }).map((_, i) => {
                const present = i % 6 !== 0; // demo: one absent day
                return (
                  <div key={i} className={`p-3 rounded-md text-center ${present ? "bg-green-50" : "bg-red-50"}`}>
                    <div className="text-sm">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</div>
                    <div className="text-sm font-semibold">{present ? "P" : "A"}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 text-sm text-muted-foreground">Marked by class teacher</div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-sm text-muted-foreground">Parent</div>
            <div className="mt-2 font-semibold">Sibongile Kgosi</div>
            <div className="text-sm text-muted-foreground">Mobile: +267 7xx xxxx</div>
            <div className="mt-3">
              <button className="w-full px-3 py-2 rounded-md bg-blue-600 text-white">Contact School</button>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-sm text-muted-foreground">Quick Links</div>
            <div className="mt-3 flex flex-col gap-2">
              <a href="#" className="text-sm text-blue-600 underline">View Invoice</a>
              <a href="#" className="text-sm text-blue-600 underline">Download Report</a>
              <a href="#" className="text-sm text-blue-600 underline">Message Teacher</a>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-sm text-muted-foreground">Notes</div>
            <div className="text-sm mt-2">Parent and student views share the same dashboard layout for consistent experience.</div>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
