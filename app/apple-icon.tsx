import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1b5e20 0%, #103d16 100%)",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <path
            fill="#ffffff"
            fillRule="evenodd"
            d="M60 12 Q104 60 60 108 Q16 60 60 12 Z M60 50 L76 64 L76 90 L44 90 L44 64 Z"
          />
          <rect x="54.5" y="73" width="11" height="17" fill="#43a047" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
