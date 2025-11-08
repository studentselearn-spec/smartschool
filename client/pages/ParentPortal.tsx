import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ParentPortal() {
  return (
    <DashboardLayout>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Parent Portal</h2>
        <p className="text-sm text-muted-foreground">
          Placeholder page. Will display child name, class, attendance %, and recent messages with school logo and colors.
        </p>
      </div>
    </DashboardLayout>
  );
}
