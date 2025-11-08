import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import BrandingFooter from "@/components/BrandingFooter";
import { getDefaultBranding } from "@/lib/branding";
import { Link } from "react-router-dom";

export default function Index() {
  const branding = getDefaultBranding(window);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-white to-sky-100">
      <header className="px-6 py-4">
        <BrandLogo name={branding.schoolName} logoUrl={branding.logoUrl} showBadge />
      </header>
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur border rounded-2xl shadow-lg p-6">
          <div className="text-center mb-6">
            <div className="text-sm text-muted-foreground">Welcome to</div>
            <div className="text-xl font-semibold">{branding.schoolName}</div>
            <div className="text-xs text-blue-700 mt-1">
              {branding.subdomain}.samuelmarketplace.com
            </div>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border px-3 py-2 bg-white"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border px-3 py-2 bg-white"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <Link to="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <Link
              to="/admin"
              className="inline-flex items-center justify-center w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
            >
              Sign In
            </Link>
          </form>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            Blue-white theme • Clean modern design
          </div>
        </div>
      </main>
      <BrandingFooter />
    </div>
  );
}
