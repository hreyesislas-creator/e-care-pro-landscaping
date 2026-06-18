import { Icon } from "@/components/Icon";
import { CallButton } from "@/components/Buttons";
import { EstimateForm } from "@/components/EstimateForm";
import { site } from "@/lib/site";

const chips = [
  { icon: "shield" as const, label: "Licensed & Insured" },
  { icon: "map" as const, label: "Locally Owned" },
  { icon: "star" as const, label: "4.9★ Rated" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-forest-darker pt-[var(--header-h)] text-white">
      {/* Background layers */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 0%, #1b5e20 0%, #103d16 45%, #0a2c10 100%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-grain opacity-60" aria-hidden="true" />
      <svg
        className="absolute inset-0 -z-10 h-full w-full opacity-[0.12]"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g fill="none" stroke="#ffffff" strokeWidth="2">
          <path d="M-50 120 C 300 40, 500 220, 850 120 S 1300 60, 1300 140" />
          <path d="M-50 220 C 300 140, 500 320, 850 220 S 1300 160, 1300 240" />
          <path d="M-50 320 C 300 240, 500 420, 850 320 S 1300 260, 1300 340" />
          <path d="M-50 420 C 300 340, 500 520, 850 420 S 1300 360, 1300 440" />
          <path d="M-50 520 C 300 440, 500 620, 850 520 S 1300 460, 1300 540" />
        </g>
      </svg>

      <div className="container-x grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-24">
        {/* Copy */}
        <div className="reveal max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-fresh-light backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-fresh-light" />
            Serving Bay Point &amp; all of Contra Costa County
          </div>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            Premium Landscaping
            <span className="block text-fresh-light">Built to Impress.</span>
            <span className="block">Made to Last.</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/80">
            Award-worthy landscape design, pavers, irrigation, fencing, and tree services for
            discerning homeowners and businesses across the East Bay. Licensed, insured, and
            obsessed with the details.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <CallButton size="lg" />
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/25 px-7 py-4 font-display font-bold text-white transition hover:bg-white/10"
            >
              View Our Work
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {chips.map((c) => (
              <li key={c.label} className="flex items-center gap-2 text-sm font-semibold text-white/85">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-fresh-light">
                  <Icon name={c.icon} className="h-4 w-4" />
                </span>
                {c.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Estimate form — above the fold */}
        <div className="reveal reveal-delay-2 lg:justify-self-end lg:w-full lg:max-w-md" id="estimate-hero">
          <EstimateForm compact />
        </div>
      </div>

      {/* Bottom curve into next section */}
      <div className="relative">
        <svg className="block h-[40px] w-full sm:h-[64px]" viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 64 L1440 64 L1440 0 C 1080 56, 360 56, 0 0 Z" fill="#f6f7f5" />
        </svg>
      </div>
      <span className="sr-only">{site.tagline}</span>
    </section>
  );
}
