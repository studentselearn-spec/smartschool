import MainLayout from "@/components/layout/MainLayout";

export default function Reports() {
  return (
    <MainLayout>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Reports</h2>
        <p className="text-sm text-muted-foreground">
          Placeholder page. Will include MOE-compliant Attendance Report, Financial Report, and Student Performance Summary downloads.
        </p>
      </div>
    </MainLayout>
  );
}
