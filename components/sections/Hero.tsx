import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { site, primaryPhone } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-charcoal text-white">
      {/* Full-bleed hero photograph */}
      <Image
        src="/images/hero.png"
        alt="Luxury California residential property with manicured lawn, custom paver walkway, and premium landscaping at golden hour in Contra Costa County"
        fill
        priority
        sizes="100vw"
        quality={82}
        className="object-cover"
        style={{ objectPosition: "center 45%" }}
      />

      {/* Dark gradient overlays for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,28,14,0.86) 0%, rgba(10,28,14,0.62) 42%, rgba(10,28,14,0.18) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(8,22,11,0.85) 0%, rgba(8,22,11,0.10) 45%, rgba(8,22,11,0.30) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container-x relative z-10 w-full pt-[calc(var(--header-h)+2rem)] pb-16 sm:pb-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-fresh-light" />
            Premium Landscaping Contractor · Bay Point, CA
          </div>

          <h1 className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.03] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            We Transform
            <span className="block text-fresh-light">Properties.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
            Award-worthy landscape design, pavers, irrigation, fencing, and tree services for
            discerning homeowners and businesses across Contra Costa County. Licensed, insured,
            and obsessed with the details.
          </p>

          {/* Review rating */}
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex text-gold" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="star" className="h-5 w-5" strokeWidth={1} />
              ))}
            </span>
            <span className="text-sm font-semibold text-white">
              <span className="font-display text-base font-extrabold">{site.rating.value}/5</span>{" "}
              from {site.rating.count}+ happy customers
            </span>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="#estimate"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-display text-base font-bold tracking-tight text-charcoal shadow-lift transition hover:bg-gold-light hover:-translate-y-0.5"
            >
              <Icon name="sparkle" className="h-5 w-5" /> Get a Free Estimate
            </Link>
            <a
              href={`tel:${primaryPhone.tel}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-8 py-4 font-display text-base font-bold tracking-tight text-white ring-1 ring-white/30 backdrop-blur-sm transition hover:bg-white/20"
              aria-label={`Call E-Care Pro Landscaping at ${primaryPhone.display}`}
            >
              <Icon name="phone" className="h-5 w-5" /> Call {primaryPhone.display}
            </a>
          </div>

          {/* Service area text */}
          <p className="mt-8 flex items-start gap-2 text-sm text-white/75">
            <Icon name="map" className="mt-0.5 h-4 w-4 shrink-0 text-fresh-light" />
            <span>
              Proudly serving Bay Point, Pittsburg, Antioch, Concord, Walnut Creek, Brentwood,
              Martinez, Pleasant Hill, Oakley &amp; all of Contra Costa County.
            </span>
          </p>
        </div>
      </div>

      <span className="sr-only">{site.tagline}</span>
    </section>
  );
}
