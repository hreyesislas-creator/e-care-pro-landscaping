type Props = {
  className?: string;
  variant?: "color" | "light" | "mono";
  showText?: boolean;
};

/**
 * E-Care Pro Landscaping — leaf + negative-space house mark with wordmark.
 */
export function Logo({ className, variant = "color", showText = true }: Props) {
  const leaf =
    variant === "light" ? "#ffffff" : variant === "mono" ? "currentColor" : "#1b5e20";
  const accent = variant === "light" ? "#9ccc65" : "#43a047";
  const word1 = variant === "light" ? "#ffffff" : "#263238";
  const word2 = variant === "light" ? "#9ccc65" : "#1b5e20";

  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg
        viewBox="0 0 120 120"
        width="40"
        height="40"
        role="img"
        aria-label="E-Care Pro Landscaping"
        style={{ flex: "none" }}
      >
        <path
          fill={leaf}
          fillRule="evenodd"
          d="M60 12 Q104 60 60 108 Q16 60 60 12 Z M60 50 L76 64 L76 90 L44 90 L44 64 Z"
        />
        <line x1="60" y1="15" x2="60" y2="49" stroke={accent} strokeWidth="3" strokeLinecap="round" />
        <rect x="54.5" y="73" width="11" height="17" fill={accent} />
      </svg>
      {showText && (
        <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 800,
              fontSize: "1.05rem",
              letterSpacing: "-0.01em",
              color: word1,
            }}
          >
            E-CARE <span style={{ color: word2 }}>PRO</span>
          </span>
          <span
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 600,
              fontSize: "0.5rem",
              letterSpacing: "0.32em",
              color: accent,
              marginTop: 2,
            }}
          >
            LANDSCAPING
          </span>
        </span>
      )}
    </span>
  );
}
