import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  site.address.full
)}`;

export function Contact() {
  return (
    <section id="contact" className="bg-white py-20 sm:py-28 scroll-mt-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title="Get in touch with E-Care Pro"
          intro="Locally owned and ready to help. Reach out any way you like — we respond fast."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Details */}
          <Reveal className="grid gap-4 sm:grid-cols-2">
            <a
              href={`tel:${site.phones[0].tel}`}
              className="group flex flex-col gap-2 rounded-3xl border border-black/[0.06] bg-cream p-6 transition hover:border-fresh/30 hover:bg-white hover:shadow-card"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/8 text-forest transition group-hover:bg-fresh group-hover:text-white">
                <Icon name="phone" className="h-6 w-6" />
              </span>
              <span className="mt-1 text-xs font-bold uppercase tracking-wide text-charcoal/55">Call or text</span>
              <span className="font-display text-lg font-extrabold text-charcoal">{site.phones[0].display}</span>
              <span className="text-sm text-charcoal-light">{site.phones[1].display}</span>
            </a>

            <a
              href={`mailto:${site.email}`}
              className="group flex flex-col gap-2 rounded-3xl border border-black/[0.06] bg-cream p-6 transition hover:border-fresh/30 hover:bg-white hover:shadow-card"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/8 text-forest transition group-hover:bg-fresh group-hover:text-white">
                <Icon name="sparkle" className="h-6 w-6" />
              </span>
              <span className="mt-1 text-xs font-bold uppercase tracking-wide text-charcoal/55">Email</span>
              <span className="break-all font-display text-base font-extrabold text-charcoal">{site.email}</span>
            </a>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 rounded-3xl border border-black/[0.06] bg-cream p-6 transition hover:border-fresh/30 hover:bg-white hover:shadow-card"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/8 text-forest transition group-hover:bg-fresh group-hover:text-white">
                <Icon name="map" className="h-6 w-6" />
              </span>
              <span className="mt-1 text-xs font-bold uppercase tracking-wide text-charcoal/55">Visit / Service area</span>
              <span className="font-display text-base font-extrabold text-charcoal">{site.address.street}</span>
              <span className="text-sm text-charcoal-light">
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </span>
            </a>

            <div className="flex flex-col gap-2 rounded-3xl border border-black/[0.06] bg-cream p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/8 text-forest">
                <Icon name="clock" className="h-6 w-6" />
              </span>
              <span className="mt-1 text-xs font-bold uppercase tracking-wide text-charcoal/55">Hours</span>
              <span className="font-display text-base font-extrabold text-charcoal">Mon–Fri 7am–6pm</span>
              <span className="text-sm text-charcoal-light">Sat 8am–4pm · Sun by appointment</span>
            </div>
          </Reveal>

          {/* Map panel */}
          <Reveal delay={2}>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-full min-h-[320px] overflow-hidden rounded-3xl shadow-card"
              aria-label="Get directions to E-Care Pro Landscaping"
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #103d16 0%, #1b5e20 55%, #2e7d32 100%)",
                }}
              />
              {/* faux map grid */}
              <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden="true">
                <defs>
                  <pattern id="map-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                    <path d="M48 0H0V48" fill="none" stroke="#ffffff" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-grid)" />
              </svg>
              <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 210 L160 150 L260 190 L400 120" stroke="#dcc080" strokeWidth="6" fill="none" />
                <path d="M40 0 L120 120 L90 300" stroke="#ffffff" strokeWidth="4" fill="none" />
              </svg>
              {/* pin */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-charcoal shadow-lift transition group-hover:scale-110">
                  <Icon name="map" className="h-8 w-8" strokeWidth={2} />
                </span>
                <div className="mt-3 font-display text-lg font-extrabold drop-shadow">{site.name}</div>
                <div className="text-sm text-white/85">{site.address.full}</div>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur-sm transition group-hover:bg-white/25">
                  Get Directions →
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
