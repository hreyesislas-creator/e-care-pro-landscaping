import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { CallButton } from "@/components/Buttons";
import { EstimateForm } from "@/components/EstimateForm";
import { site, primaryPhone } from "@/lib/site";

const points = [
  "Free, no-obligation estimate",
  "Transparent, itemized pricing",
  "Licensed & insured crews",
  "Fast scheduling across the East Bay",
];

export function FinalCTA({
  defaultService,
  defaultCity,
}: {
  defaultService?: string;
  defaultCity?: string;
}) {
  return (
    <section id="estimate" className="relative isolate overflow-hidden bg-forest-darker py-20 text-white sm:py-28 scroll-mt-24">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(110% 90% at 85% 10%, #1b5e20 0%, #103d16 50%, #0a2c10 100%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-grain opacity-50" aria-hidden="true" />

      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow text-fresh-light">Free Estimate</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.08] sm:text-4xl md:text-[2.75rem]">
            Ready to transform your
            <span className="block text-fresh-light">outdoor space?</span>
          </h2>
          <p className="mt-4 max-w-lg text-lg text-white/80">
            Tell us about your project and we&apos;ll get back to you fast with a free, honest
            estimate. No pressure — just expert advice from your local landscaping pros.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-white/90">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fresh/25 text-fresh-light">
                  <Icon name="check" className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium">{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <p className="text-sm font-semibold text-white/70">Prefer to talk now? Call us directly:</p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              {site.phones.map((p) => (
                <a
                  key={p.tel}
                  href={`tel:${p.tel}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 font-display font-bold text-white transition hover:bg-white/20"
                >
                  <Icon name="phone" className="h-5 w-5 text-fresh-light" /> {p.display}
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={2} className="lg:justify-self-end lg:w-full lg:max-w-md">
          <EstimateForm defaultService={defaultService} defaultCity={defaultCity} />
        </Reveal>
      </div>
    </section>
  );
}
