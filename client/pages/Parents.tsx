import AppLayout from "@/components/layout/AppLayout";
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";

const demoParents = [
  { id: 1, name: "Sibongile Kgosi", child: "Tebogo Kgosi", class: "Grade 5 - A", contact: "+267 71 234 567", status: "Active" },
  { id: 2, name: "Naledi Dube", child: "Kabelo Dube", class: "Grade 2 - B", contact: "+267 72 345 678", status: "Active" },
  { id: 3, name: "Mpho Lekgowe", child: "Neo Lekgowe", class: "Grade 8 - C", contact: "+267 73 456 789", status: "Active" },
];

export default function Parents() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <AppLayout>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Parents</h2>
          <div className="text-sm text-muted-foreground">Manage parent accounts and view child reports</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="py-2">Name</th>
                <th className="py-2">Child</th>
                <th className="py-2">Class</th>
                <th className="py-2">Contact</th>
                <th className="py-2">Status</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {demoParents.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="py-3">{p.name}</td>
                  <td className="py-3">{p.child}</td>
                  <td className="py-3">{p.class}</td>
                  <td className="py-3">{p.contact}</td>
                  <td className="py-3">{p.status}</td>
                  <td className="py-3">
                    <button
                      onClick={() => setSelected(p.id)}
                      className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="mt-6 rounded-lg border bg-blue-50 p-4">
            <h3 className="font-semibold">Child Report (Preview)</h3>
            <div className="mt-3 text-sm">
              This is a visual preview of the child report. Download as PDF in the final product.
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-3 py-2 rounded-md bg-white border">Download PDF</button>
              <button onClick={() => setSelected(null)} className="px-3 py-2 rounded-md border">Close</button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
