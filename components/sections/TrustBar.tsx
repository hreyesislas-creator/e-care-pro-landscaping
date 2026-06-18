import { Reveal } from "@/components/Reveal";
import { stats } from "@/lib/data";

export function TrustBar() {
  return (
    <section aria-label="Company highlights" className="bg-cream">
      <div className="container-x -mt-6 sm:-mt-10">
        <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-black/5 shadow-card lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-5 py-6 text-center sm:py-8">
              <div className="font-display text-3xl font-extrabold text-forest sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-charcoal/60 sm:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
