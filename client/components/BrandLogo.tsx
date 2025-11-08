import React from "react";

export function BrandLogo({
  name,
  logoUrl,
  size = 36,
  showBadge = false,
}: {
  name: string;
  logoUrl?: string | null;
  size?: number;
  showBadge?: boolean;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-3">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className="rounded-md shadow-sm"
          style={{ width: size, height: size, objectFit: "cover" }}
        />
      ) : (
        <div
          className="rounded-md flex items-center justify-center text-white font-semibold shadow-sm"
          style={{
            width: size,
            height: size,
            background: "linear-gradient(135deg, #5BB7F0, #2196F3)",
          }}
        >
          {initials}
        </div>
      )}
      <div className="leading-tight">
        <div className="font-semibold">{name}</div>
        {showBadge && (
          <div className="text-[10px] px-2 py-0.5 rounded-full inline-block bg-blue-100 text-blue-700 border border-blue-200">
            Founding Partner School
          </div>
        )}
      </div>
    </div>
  );
}
