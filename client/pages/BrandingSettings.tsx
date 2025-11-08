import DashboardLayout from "@/components/layout/DashboardLayout";

export default function BrandingSettings() {
  return (
    <DashboardLayout>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Branding Settings</h2>
        <p className="text-sm text-muted-foreground">
          Placeholder page. Will include logo upload, primary/secondary color pickers, custom domain input, live preview, and Save Branding.
        </p>
      </div>
    </DashboardLayout>
  );
}
