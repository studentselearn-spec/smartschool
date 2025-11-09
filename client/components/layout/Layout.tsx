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
  CalendarDays,
  Briefcase,
  Receipt,
  Menu,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutGrid },
  { to: "/students", label: "Students", icon: Users },
  { to: "/parents", label: "Parents", icon: UsersRound },
  { to: "/attendance", label: "Attendance", icon: ClipboardCheck },
  { to: "/timetable", label: "Timetable", icon: CalendarDays },
  { to: "/staff", label: "Staff", icon: Briefcase },
  { to: "/fees", label: "Fees", icon: Wallet },
  { to: "/expenses", label: "Expenses", icon: Receipt },
  { to: "/reports", label: "Reports", icon: BarChart2 },
  { to: "/branding", label: "Branding", icon: Palette },
];

// HMR-safe Layout singleton
if (!(window as any).__fuse_layout__) {
  (window as any).__fuse_layout__ = (props: { children: React.ReactNode }) => {
    const branding = getDefaultBranding(window);
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Mobile group open states handled at parent level to avoid nested hook components
    const [mgOpen, setMgOpen] = useState(true);
    const [opOpen, setOpOpen] = useState(true);

    const { children } = props;

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-sky-50">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] min-h-screen">
          <aside className="hidden md:flex flex-col border-r bg-white/80 backdrop-blur">
            <div className="p-4 border-b">
              <BrandLogo
                name={branding.schoolName}
                logoUrl={branding.logoUrl}
              />
              <div className="mt-2 text-[11px] text-muted-foreground">
                Custom Domain Active
              </div>
              <div className="text-xs font-medium text-blue-600">
                {branding.subdomain}.samuelmarketplace.com
              </div>
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
                      active
                        ? "bg-blue-600 text-white shadow-sm"
                        : "hover:bg-sky-50 text-slate-700"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t">
              <Link
                to="/parent"
                className="text-xs text-blue-700 hover:underline"
              >
                Parent Portal
              </Link>
            </div>
          </aside>
          <main className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
              <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setMobileOpen(true)}
                    className="md:hidden p-2 rounded-md hover:bg-slate-100"
                    aria-label="Open menu"
                  >
                    <Menu size={20} />
                  </button>

                  <div className="md:hidden">
                    <BrandLogo
                      name={branding.schoolName}
                      logoUrl={branding.logoUrl}
                    />
                  </div>

                  <div className="hidden md:flex">
                    <span className="text-sm text-muted-foreground">
                      Campus:
                    </span>
                    <select className="ml-2 text-sm rounded-md border bg-white px-2 py-1">
                      <option>{branding.campus}</option>
                      <option>North Campus</option>
                      <option>South Campus</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline text-xs text-muted-foreground">
                    Founding Partner School
                  </span>
                  <div className="h-6 px-2 text-[11px] rounded-full bg-blue-100 text-blue-700 border border-blue-200 flex items-center">
                    Beta
                  </div>
                </div>
              </div>

              {/* Mobile menu overlay */}
              {mobileOpen && (
                <div className="md:hidden fixed inset-0 z-50">
                  <div
                    className="absolute inset-0 bg-black/40"
                    onClick={() => setMobileOpen(false)}
                  />
                  <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white p-4 shadow-lg overflow-auto">
                    <div className="flex items-center justify-between mb-4">
                      <BrandLogo
                        name={branding.schoolName}
                        logoUrl={branding.logoUrl}
                      />
                      <button
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                        className="p-2 rounded-md hover:bg-slate-100"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <nav className="flex flex-col gap-1">
                      {/* Dashboard */}
                      {(() => {
                        const item = navItems.find((n) => n.to === "/admin")!;
                        const Icon = item.icon as any;
                        const active = location.pathname === item.to;
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md mb-1 text-sm transition ${
                              active
                                ? "bg-blue-600 text-white shadow-sm"
                                : "hover:bg-sky-50 text-slate-700"
                            }`}
                          >
                            <Icon size={18} />
                            {item.label}
                          </Link>
                        );
                      })()}

                      {/* Management group */}
                      <ManagementGroup />

                      {/* Operations group */}
                      <OperationsGroup />

                      {/* Reports */}
                      {(() => {
                        const item = navItems.find((n) => n.to === "/reports")!;
                        const Icon = item.icon as any;
                        const active = location.pathname === item.to;
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md mb-1 text-sm transition ${
                              active
                                ? "bg-blue-600 text-white shadow-sm"
                                : "hover:bg-sky-50 text-slate-700"
                            }`}
                          >
                            <Icon size={18} />
                            {item.label}
                          </Link>
                        );
                      })()}

                      {/* Branding */}
                      {(() => {
                        const item = navItems.find(
                          (n) => n.to === "/branding",
                        )!;
                        const Icon = item.icon as any;
                        const active = location.pathname === item.to;
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md mb-1 text-sm transition ${
                              active
                                ? "bg-blue-600 text-white shadow-sm"
                                : "hover:bg-sky-50 text-slate-700"
                            }`}
                          >
                            <Icon size={18} />
                            {item.label}
                          </Link>
                        );
                      })()}

                      <div className="mt-3">
                        <Link
                          to="/parent"
                          onClick={() => setMobileOpen(false)}
                          className="text-sm text-blue-700 hover:underline"
                        >
                          Parent Portal
                        </Link>
                      </div>
                    </nav>
                  </aside>
                </div>
              )}
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

export default (window as any).__fuse_layout__;
