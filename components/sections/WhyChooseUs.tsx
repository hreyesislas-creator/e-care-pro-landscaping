import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { Icon } from "@/components/Icon";
import { CallButton } from "@/components/Buttons";
import { whyChooseUs } from "@/lib/data";

export function WhyChooseUs() {
  return (
    <section id="why" className="bg-white py-20 sm:py-28 scroll-mt-24">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Why E-Care Pro"
            title={
              <>
                The contractor your
                <br className="hidden sm:block" /> neighbors recommend
              </>
            }
            intro="We combine agency-level design with contractor-grade craftsmanship — and treat every property like it's our own. That's how we've earned a 5-star reputation across Contra Costa County."
          />

          <Reveal className="mt-8" delay={1}>
            <Photo
              src="/images/why-choose-us.png"
              alt="Stunning luxury California estate landscape designed and built by E-Care Pro Landscaping"
              sizes="(max-width:1024px) 100vw, 45vw"
              quality={82}
              ratio="4 / 5"
              className="shadow-card"
            />
          </Reveal>

          <Reveal className="mt-6 rounded-3xl bg-forest p-7 text-white shadow-card" delay={2}>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-fresh-light">
                <Icon name="shield" className="h-6 w-6" />
              </span>
              <div>
                <div className="font-display text-lg font-extrabold">Licensed &amp; Insured</div>
                <div className="text-sm text-white/70">Fully covered on every project</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              Liability insurance and workers&apos; coverage protect your property and our crews — so
              you can hire with total confidence.
            </p>
            <div className="mt-5">
              <CallButton variant="light" />
            </div>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {whyChooseUs.map((w, i) => (
            <Reveal
              key={w.title}
              delay={((i % 2) + 1) as 1 | 2}
              className="group rounded-3xl border border-black/[0.06] bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:border-fresh/30 hover:bg-white hover:shadow-card"
            >
              <span className="flex items-center justify-center rounded-2xl bg-forest/8 text-forest transition group-hover:bg-fresh group-hover:text-white" style={{ height: "3.25rem", width: "3.25rem" }}>
                <Icon name={w.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-4 font-display text-lg font-extrabold text-charcoal">{w.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-charcoal-light">{w.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
