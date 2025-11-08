import AppLayout from "@/components/layout/AppLayout";

export default function Attendance() {
  return (
    <DashboardLayout>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Attendance</h2>
        <p className="text-sm text-muted-foreground">
          Placeholder page. Will include class selector, student list with checkboxes, Mark Attendance button, daily summary, and offline sync indicator.
        </p>
      </div>
    </DashboardLayout>
  );
}
