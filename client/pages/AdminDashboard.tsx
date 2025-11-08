import AppLayout from "@/components/layout/AppLayout";
import { getDefaultBranding } from "@/lib/branding";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Students", value: 1260 },
  { label: "Fees Collected", value: "P 1,240,000" },
  { label: "Attendance %", value: "96%" },
  { label: "Staff Count", value: 84 },
];

const monthlyFees = [
  { month: "Jan", fees: 80 },
  { month: "Feb", fees: 92 },
  { month: "Mar", fees: 88 },
  { month: "Apr", fees: 101 },
  { month: "May", fees: 110 },
  { month: "Jun", fees: 97 },
  { month: "Jul", fees: 123 },
  { month: "Aug", fees: 115 },
  { month: "Sep", fees: 130 },
  { month: "Oct", fees: 128 },
  { month: "Nov", fees: 135 },
  { month: "Dec", fees: 140 },
];

export default function AdminDashboard() {
  const branding = getDefaultBranding(window);

  return (
    <DashboardLayout>
      <div className="rounded-lg bg-gradient-to-r from-blue-50 to-white p-4 border mb-6">
        <div className="text-sm">Custom Domain Active:</div>
        <div className="font-semibold text-blue-700">{branding.subdomain}.samuelmarketplace.com</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border bg-white p-4 shadow-sm hover:shadow transition"
          >
            <div className="text-sm text-muted-foreground">{s.label}</div>
            <div className="mt-2 text-2xl font-bold text-slate-800">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Monthly Fee Collection</h3>
            <div className="text-xs text-muted-foreground">Currency: Pula (BWP)</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyFees}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="fees" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <Link
            to="/students"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm w-full"
          >
            Add New Student
          </Link>
          <div className="mt-4 rounded-lg bg-blue-50 border border-blue-100 p-3 text-sm text-blue-800">
            Improve fee collection by enabling online payments via Samuel Marketplace.
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
