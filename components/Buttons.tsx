import Link from "next/link";
import { Icon } from "@/components/Icon";
import { primaryPhone } from "@/lib/site";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-bold tracking-tight transition-all duration-200 focus-visible:outline-3";

const sizes = {
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-7 py-4 text-base",
};

export function CallButton({
  size = "md",
  full = false,
  variant = "primary",
  label,
}: {
  size?: keyof typeof sizes;
  full?: boolean;
  variant?: "primary" | "light" | "outline" | "dark";
  label?: string;
}) {
  const styles = {
    primary:
      "bg-fresh text-white shadow-soft hover:bg-forest hover:-translate-y-0.5",
    light:
      "bg-white text-forest shadow-soft hover:bg-cream hover:-translate-y-0.5",
    outline:
      "border-2 border-white/40 text-white hover:bg-white hover:text-forest",
    dark: "bg-charcoal text-white hover:bg-charcoal-light",
  }[variant];

  return (
    <a
      href={`tel:${primaryPhone.tel}`}
      className={`${base} ${sizes[size]} ${styles} ${full ? "w-full" : ""}`}
      aria-label={`Call E-Care Pro Landscaping at ${primaryPhone.display}`}
    >
      <Icon name="phone" className="h-5 w-5" />
      {label ?? `Call ${primaryPhone.display}`}
    </a>
  );
}

export function QuoteButton({
  size = "md",
  full = false,
  variant = "gold",
  href = "/#estimate",
  label = "Get a Free Estimate",
}: {
  size?: keyof typeof sizes;
  full?: boolean;
  variant?: "gold" | "forest" | "light" | "outline";
  href?: string;
  label?: string;
}) {
  const styles = {
    gold: "bg-gold text-charcoal shadow-soft hover:bg-gold-light hover:-translate-y-0.5",
    forest:
      "bg-forest text-white shadow-soft hover:bg-forest-dark hover:-translate-y-0.5",
    light: "bg-white text-forest shadow-soft hover:bg-cream hover:-translate-y-0.5",
    outline:
      "border-2 border-white/40 text-white hover:bg-white hover:text-forest",
  }[variant];

  return (
    <Link href={href} className={`${base} ${sizes[size]} ${styles} ${full ? "w-full" : ""}`}>
      <Icon name="sparkle" className="h-5 w-5" />
      {label}
    </Link>
  );
}
