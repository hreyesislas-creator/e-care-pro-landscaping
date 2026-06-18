import { Icon } from "@/components/Icon";
import type { IconName } from "@/lib/data";

type Props = {
  gradient: [string, string];
  icon: IconName;
  label?: string;
  sublabel?: string;
  className?: string;
  rounded?: string;
  tall?: boolean;
};

/**
 * Designed "photo-style" visual: layered gradient + topographic overlay + icon.
 * Renders instantly, scores perfectly on performance, and is easy to swap for
 * real photography later (replace this component with next/image).
 */
export function Visual({
  gradient,
  icon,
  label,
  sublabel,
  className = "",
  rounded = "rounded-3xl",
  tall = false,
}: Props) {
  const [from, to] = gradient;
  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
        aspectRatio: tall ? "3 / 4" : "4 / 3",
      }}
    >
      {/* Topographic contour overlay */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g fill="none" stroke="#ffffff" strokeWidth="1.5">
          <path d="M-20 60 C 80 20, 140 100, 240 60 S 420 30, 460 80" />
          <path d="M-20 110 C 80 70, 140 150, 240 110 S 420 80, 460 130" />
          <path d="M-20 160 C 80 120, 140 200, 240 160 S 420 130, 460 180" />
          <path d="M-20 210 C 80 170, 140 250, 240 210 S 420 180, 460 230" />
          <path d="M-20 260 C 80 220, 140 300, 240 260 S 420 230, 460 280" />
        </g>
      </svg>

      {/* Soft glow */}
      <div
        className="absolute -right-10 -top-10 h-48 w-48 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.28), transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Watermark icon */}
      <Icon
        name={icon}
        strokeWidth={1.25}
        className="absolute -bottom-6 -right-4 h-44 w-44 text-white/15"
      />

      {/* Bottom gradient + label */}
      {(label || sublabel) && (
        <>
          <div
            className="absolute inset-x-0 bottom-0 h-2/3"
            style={{ background: "linear-gradient(to top, rgba(10,44,16,0.72), transparent)" }}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 p-5">
            {sublabel && (
              <div className="eyebrow text-white/80">{sublabel}</div>
            )}
            {label && (
              <div className="mt-1 font-display text-lg font-extrabold leading-tight text-white">
                {label}
              </div>
            )}
          </div>
        </>
      )}

      {/* Foreground icon badge */}
      <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/25">
        <Icon name={icon} className="h-6 w-6 text-white" />
      </div>
    </div>
  );
}
