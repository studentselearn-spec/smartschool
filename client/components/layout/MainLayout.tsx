import { Link, useLocation } from "react-router-dom";
import { BrandLogo } from "@/components/BrandLogo";
import BrandingFooter from "@/components/BrandingFooter";
import { getDefaultBranding } from "@/lib/branding";
import {
  LayoutGrid,
  Users,
  ClipboardCheck,
  Wallet,
  BarChart2,
  Palette,
  UsersRound,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutGrid },
  { to: "/students", label: "Students", icon: Users },
  { to: "/parents", label: "Parents", icon: UsersRound },
  { to: "/attendance", label: "Attendance", icon: ClipboardCheck },
  { to: "/fees", label: "Fees", icon: Wallet },
  { to: "/reports", label: "Reports", icon: BarChart2 },
  { to: "/branding", label: "Branding", icon: Palette },
];

// HMR-safe MainLayout singleton
if (!(window as any).__fuse_main_layout__) {
  (window as any).__fuse_main_layout__ = (props: { children: React.ReactNode }) => {
    const branding = getDefaultBranding(window);
    const location = useLocation();
    const { children } = props;

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-sky-50">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] min-h-screen">
          <aside className="hidden md:flex flex-col border-r bg-white/80 backdrop-blur">
            <div className="p-4 border-b">
              <BrandLogo name={branding.schoolName} logoUrl={branding.logoUrl} />
              <div className="mt-2 text-[11px] text-muted-foreground">Custom Domain Active</div>
              <div className="text-xs font-medium text-blue-600">{branding.subdomain}.samuelmarketplace.com</div>
            </div>
            <nav className="flex-1 p-2">
              {navItems.map((item) => {
                const Icon = item.icon as any;
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md mb-1 text-sm transition ${
                      active ? "bg-blue-600 text-white shadow-sm" : "hover:bg-sky-50 text-slate-700"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t">
              <Link to="/parent" className="text-xs text-blue-700 hover:underline">
                Parent Portal
              </Link>
            </div>
          </aside>
          <main className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
              <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="md:hidden">
                    <BrandLogo name={branding.schoolName} logoUrl={branding.logoUrl} />
                  </div>
                  <div className="hidden md:flex">
                    <span className="text-sm text-muted-foreground">Campus:</span>
                    <select className="ml-2 text-sm rounded-md border bg-white px-2 py-1">
                      <option>{branding.campus}</option>
                      <option>North Campus</option>
                      <option>South Campus</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline text-xs text-muted-foreground">Founding Partner School</span>
                  <div className="h-6 px-2 text-[11px] rounded-full bg-blue-100 text-blue-700 border border-blue-200 flex items-center">Beta</div>
                </div>
              </div>
            </header>
            <div className="flex-1">
              <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
            </div>
            <BrandingFooter />
          </main>
        </div>
      </div>
    );
  };
}

export default (window as any).__fuse_main_layout__;
