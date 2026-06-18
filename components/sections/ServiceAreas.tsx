import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { cities } from "@/lib/data";

export function ServiceAreas() {
  const county = cities.find((c) => c.isCounty)!;
  const towns = cities.filter((c) => !c.isCounty);

  return (
    <section id="areas" className="bg-cream py-20 sm:py-28 scroll-mt-24">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="Service Areas"
          title="Proudly serving Contra Costa County"
          intro="Locally based in Bay Point and trusted across the East Bay. Wherever you are in the county, our crews bring premium landscaping right to your property."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* County feature card */}
          <Reveal className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <Link
              href={`/service-areas/${county.slug}`}
              className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-forest p-7 text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-fresh-light">
                  <Icon name="map" className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-extrabold">{county.name}</h3>
                <p className="mt-3 leading-relaxed text-white/80">{county.blurb}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 font-display font-bold text-gold-light transition group-hover:gap-3">
                County-wide service <span aria-hidden="true">→</span>
              </span>
            </Link>
          </Reveal>

          {towns.map((c, i) => (
            <Reveal key={c.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <Link
                href={`/service-areas/${c.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-black/[0.06] bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-fresh/30 hover:shadow-lift"
              >
                <div className="flex items-center gap-2.5">
                  <Icon name="map" className="h-5 w-5 text-fresh" />
                  <h3 className="font-display text-lg font-extrabold text-charcoal">{c.name}</h3>
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-light">{c.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-forest transition group-hover:gap-2.5">
                  Landscaping in {c.name} <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
