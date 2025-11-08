import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Fees() {
  return (
    <DashboardLayout>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Fees</h2>
        <p className="text-sm text-muted-foreground">
          Placeholder page. Will include fees table, Generate Invoice and Send Reminder buttons.
        </p>
      </div>
    </DashboardLayout>
  );
}
