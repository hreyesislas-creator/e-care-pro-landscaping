import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";
import { CallButton, QuoteButton } from "@/components/Buttons";
import { services, cities } from "@/lib/data";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-charcoal text-white/80">
      {/* CTA strip */}
      <div className="border-b border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-5 py-10 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
              Let&apos;s build something beautiful.
            </h2>
            <p className="mt-1 text-white/70">
              Free estimates across Bay Point &amp; Contra Costa County.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <CallButton variant="light" />
            <QuoteButton variant="gold" />
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            {site.description}
          </p>
          <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-fresh-light">
            <Icon name="shield" className="h-5 w-5" /> Licensed &amp; Insured
          </div>
        </div>

        <nav aria-label="Services">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="transition hover:text-fresh-light">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Service areas">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Service Areas</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={`/service-areas/${c.slug}`} className="transition hover:text-fresh-light">
                  {c.isCounty ? c.name : `${c.name}, CA`}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {site.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="inline-flex items-center gap-2 transition hover:text-fresh-light">
                  <Icon name="phone" className="h-4 w-4 text-fresh-light" /> {p.display}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 break-all transition hover:text-fresh-light">
                <Icon name="sparkle" className="h-4 w-4 text-fresh-light" /> {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="map" className="mt-0.5 h-4 w-4 shrink-0 text-fresh-light" />
              <address className="not-italic">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </address>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="clock" className="h-4 w-4 text-fresh-light" /> {site.hoursLabel}
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-white/55 sm:flex-row sm:text-left">
          <p>
            © {year} {site.name}. All rights reserved. · Landscaping Contractor in Bay Point, CA
          </p>
          <p>Landscaping · Irrigation · Fences · Pavers · Tree Services · Contra Costa County</p>
        </div>
      </div>
    </footer>
  );
}
