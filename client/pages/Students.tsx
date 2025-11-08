import MainLayout from "@/components/layout/MainLayout";

export default function Students() {
  return (
    <MainLayout>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Students</h2>
        <p className="text-sm text-muted-foreground">
          Placeholder page. Ask to fill this page with search, filters, table and Add Student modal.
        </p>
      </div>
    </MainLayout>
  );
}
