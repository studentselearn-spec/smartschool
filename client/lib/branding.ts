export type Branding = {
  schoolName: string;
  subdomain: string;
  domain: string;
  logoUrl?: string | null;
  primary: string; // HSL string like "203 76% 55%"
  secondary: string;
  campus?: string;
};

const DEFAULT_PRIMARY = "203 76% 55%"; // Botswana light blue
const DEFAULT_SECONDARY = "0 0% 100%"; // white

export function parseSubdomain(host: string) {
  // e.g., greenhill.samuelmarketplace.com
  const parts = host.split(":")[0].split(".");
  const idx = parts.indexOf("samuelmarketplace");
  if (idx > 0) {
    const sub = parts[idx - 1];
    return { subdomain: sub, domainRoot: parts.slice(idx).join(".") };
  }
  // fallbacks for preview domains
  return { subdomain: "demo", domainRoot: host.split(":")[0] };
}

export function getDefaultBranding(win: Window): Branding {
  const { subdomain, domainRoot } = parseSubdomain(win.location.host);
  const stored = win.localStorage.getItem("branding.config");
  let overrides: Partial<Branding> = {};
  if (stored) {
    try {
      overrides = JSON.parse(stored);
    } catch {}
  }
  const schoolName =
    overrides.schoolName ||
    subdomain.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) +
      (subdomain === "demo" ? " School" : "");
  const branding: Branding = {
    schoolName,
    subdomain,
    domain: `${subdomain}.samuelmarketplace.com`,
    logoUrl: overrides.logoUrl ?? null,
    primary: overrides.primary || DEFAULT_PRIMARY,
    secondary: overrides.secondary || DEFAULT_SECONDARY,
    campus: overrides.campus || "Main Campus",
  };
  return branding;
}

export function saveBranding(win: Window, data: Partial<Branding>) {
  const current = getDefaultBranding(win);
  const merged = { ...current, ...data };
  win.localStorage.setItem("branding.config", JSON.stringify(merged));
  return merged as Branding;
}
