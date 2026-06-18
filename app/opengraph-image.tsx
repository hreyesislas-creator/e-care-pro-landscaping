import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt =
  "E-Care Pro Landscaping — premium landscaping in Contra Costa County, CA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(120% 100% at 15% 0%, #1b5e20 0%, #103d16 50%, #0a2c10 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="92" height="92" viewBox="0 0 120 120">
            <path
              fill="#ffffff"
              fillRule="evenodd"
              d="M60 12 Q104 60 60 108 Q16 60 60 12 Z M60 50 L76 64 L76 90 L44 90 L44 64 Z"
            />
            <rect x="54.5" y="73" width="11" height="17" fill="#43a047" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: "#fff", letterSpacing: -1 }}>
              E-CARE PRO
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#9ccc65", letterSpacing: 8 }}>
              LANDSCAPING
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#9ccc65", letterSpacing: 2 }}>
            PREMIUM LANDSCAPING · CONTRA COSTA COUNTY
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 16,
              fontSize: 76,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            <span>Built to Impress.</span>
            <span>Made to Last.</span>
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", gap: 14, color: "#fff", fontSize: 26, fontWeight: 700 }}>
            <span>Licensed &amp; Insured</span>
            <span style={{ color: "#43a047" }}>·</span>
            <span>Free Estimates</span>
          </div>
          <div style={{ color: "#fff", fontSize: 30, fontWeight: 800 }}>
            {site.phones[0].display}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
