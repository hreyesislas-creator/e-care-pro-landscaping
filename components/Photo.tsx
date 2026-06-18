import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  quality?: number;
  label?: string;
  sublabel?: string;
  className?: string;
  rounded?: string;
  tall?: boolean;
  /** CSS object-position, e.g. "center 40%" */
  position?: string;
  /** Override the default 4:3 / 3:4 ratio with any CSS aspect-ratio value */
  ratio?: string;
};

/**
 * Production image tile backed by next/image (responsive AVIF/WebP, lazy by default).
 * Renders a real photograph with an optional dark legibility overlay + caption.
 * Replaces the old gradient `Visual` placeholder.
 */
export function Photo({
  src,
  alt,
  sizes,
  priority = false,
  quality = 78,
  label,
  sublabel,
  className = "",
  rounded = "rounded-3xl",
  tall = false,
  position = "center",
  ratio,
}: Props) {
  return (
    <div
      className={`relative overflow-hidden bg-charcoal/5 ${rounded} ${className}`}
      style={{ aspectRatio: ratio ?? (tall ? "3 / 4" : "4 / 3") }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: position }}
      />

      {(label || sublabel) && (
        <>
          <div
            className="absolute inset-x-0 bottom-0 h-2/3"
            style={{ background: "linear-gradient(to top, rgba(10,44,16,0.82), transparent)" }}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 p-5">
            {sublabel && <div className="eyebrow text-white/85">{sublabel}</div>}
            {label && (
              <div className="mt-1 font-display text-lg font-extrabold leading-tight text-white drop-shadow">
                {label}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
