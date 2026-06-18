import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton, QuoteButton } from "@/components/Buttons";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/lib/data";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  trail: { name: string; path: string }[];
  icon?: IconName;
  chips?: string[];
};

export function PageHero({ eyebrow, title, intro, trail, icon = "leaf", chips }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-darker pt-[var(--header-h)] text-white">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 100% at 20% 0%, #1b5e20 0%, #103d16 50%, #0a2c10 100%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-grain opacity-50" aria-hidden="true" />
      <Icon
        name={icon}
        strokeWidth={1}
        className="pointer-events-none absolute -right-10 top-10 h-72 w-72 text-white/[0.06]"
      />

      <div className="container-x py-12 sm:py-16">
        <Breadcrumbs trail={trail} />
        <div className="mt-6 max-w-3xl">
          <p className="eyebrow text-fresh-light">{eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>

          {chips && chips.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {chips.map((c) => (
                <li
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-white/85"
                >
                  <Icon name="check" className="h-4 w-4 text-fresh-light" strokeWidth={3} />
                  {c}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton size="lg" />
            <QuoteButton size="lg" variant="gold" />
          </div>
        </div>
      </div>

      <div className="relative">
        <svg className="block h-[40px] w-full sm:h-[56px]" viewBox="0 0 1440 56" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 56 L1440 56 L1440 0 C 1080 48, 360 48, 0 0 Z" fill="#f6f7f5" />
        </svg>
      </div>
    </section>
  );
}
