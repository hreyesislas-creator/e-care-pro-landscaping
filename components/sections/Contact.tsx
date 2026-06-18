import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { Icon } from "@/components/Icon";
import { EstimateForm } from "@/components/EstimateForm";
import { site } from "@/lib/site";
import { cities } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="bg-white py-20 sm:py-28 scroll-mt-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title="Get in touch with E-Care Pro"
          intro="Serving Bay Point and surrounding Contra Costa County communities. Locally owned and ready to help — call us or request your free estimate below and we'll respond fast."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-10">
          {/* Contact details + service areas */}
          <Reveal className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={`tel:${site.phones[0].tel}`}
                className="group flex flex-col gap-2 rounded-3xl border border-black/[0.06] bg-cream p-6 transition hover:border-fresh/30 hover:bg-white hover:shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/8 text-forest transition group-hover:bg-fresh group-hover:text-white">
                  <Icon name="phone" className="h-6 w-6" />
                </span>
                <span className="mt-1 text-xs font-bold uppercase tracking-wide text-charcoal/55">
                  Call or text
                </span>
                <span className="font-display text-lg font-extrabold text-charcoal">
                  {site.phones[0].display}
                </span>
                <span className="text-sm text-charcoal-light">{site.phones[1].display}</span>
              </a>

              <a
                href={`mailto:${site.email}`}
                className="group flex flex-col gap-2 rounded-3xl border border-black/[0.06] bg-cream p-6 transition hover:border-fresh/30 hover:bg-white hover:shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/8 text-forest transition group-hover:bg-fresh group-hover:text-white">
                  <Icon name="sparkle" className="h-6 w-6" />
                </span>
                <span className="mt-1 text-xs font-bold uppercase tracking-wide text-charcoal/55">
                  Email
                </span>
                <span className="break-all font-display text-base font-extrabold text-charcoal">
                  {site.email}
                </span>
              </a>

              <div className="flex flex-col gap-2 rounded-3xl border border-black/[0.06] bg-cream p-6 sm:col-span-2">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/8 text-forest">
                  <Icon name="clock" className="h-6 w-6" />
                </span>
                <span className="mt-1 text-xs font-bold uppercase tracking-wide text-charcoal/55">
                  Hours
                </span>
                <span className="font-display text-base font-extrabold text-charcoal">
                  Mon–Fri 7am–6pm · Sat 8am–4pm
                </span>
                <span className="text-sm text-charcoal-light">Sunday by appointment</span>
              </div>
            </div>

            {/* Service areas */}
            <div className="rounded-3xl border border-black/[0.06] bg-cream p-6">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-forest/8 text-forest">
                  <Icon name="map" className="h-5 w-5" />
                </span>
                <span className="font-display text-base font-extrabold text-charcoal">
                  Service Areas
                </span>
              </div>
              <p className="mt-3 text-sm text-charcoal-light">
                Proudly serving Bay Point and surrounding Contra Costa County communities:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {cities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/service-areas/${c.slug}`}
                    className="rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-sm font-semibold text-charcoal transition hover:border-fresh/40 hover:text-forest"
                  >
                    {c.isCounty ? c.name : `${c.name}, CA`}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trust visual — no address, no directions */}
            <Photo
              src="/images/service-vehicle.png"
              alt="E-Care Pro Landscaping crew truck and equipment, serving Contra Costa County"
              sizes="(max-width:1024px) 100vw, 45vw"
              quality={80}
              ratio="16 / 9"
              label="Licensed & insured crews across Contra Costa County"
              className="shadow-card"
            />
          </Reveal>

          {/* Estimate form */}
          <Reveal delay={2}>
            <EstimateForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
