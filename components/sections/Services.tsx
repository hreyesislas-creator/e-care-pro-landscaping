import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Visual } from "@/components/Visual";
import { Icon } from "@/components/Icon";
import { services } from "@/lib/data";

export function Services() {
  return (
    <section id="services" className="bg-cream py-20 sm:py-28 scroll-mt-24">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="What We Do"
          title={
            <>
              Full-service landscaping &amp;
              <br className="hidden sm:block" /> outdoor construction
            </>
          }
          intro="One trusted, licensed crew for every part of your property — from elegant design and pavers to irrigation, fences, and ongoing care."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <Visual
                  gradient={s.gradient}
                  icon={s.icon}
                  rounded="rounded-none"
                  className="!aspect-[16/10]"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-extrabold text-charcoal">{s.name}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-charcoal-light">
                    {s.excerpt}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {s.benefits.slice(0, 3).map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-charcoal/75">
                        <Icon name="check" className="h-4 w-4 shrink-0 text-fresh" strokeWidth={2.5} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-bold text-forest transition group-hover:gap-2.5">
                    Explore {s.name.split(" ")[0]}
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}

          {/* CTA card to fill the grid */}
          <Reveal delay={1}>
            <div className="flex h-full flex-col justify-center gap-4 rounded-3xl bg-forest p-8 text-white shadow-card">
              <Icon name="sparkle" className="h-9 w-9 text-fresh-light" />
              <h3 className="font-display text-2xl font-extrabold">Not sure where to start?</h3>
              <p className="text-white/80">
                Tell us your vision and budget. We&apos;ll design a plan and give you a free, honest
                estimate — no pressure.
              </p>
              <Link
                href="/#estimate"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-3 font-display font-bold text-charcoal transition hover:bg-gold-light"
              >
                <Icon name="sparkle" className="h-5 w-5" /> Get a Free Estimate
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
