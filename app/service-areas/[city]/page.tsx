import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { Icon } from "@/components/Icon";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/JsonLd";
import { cities, getCity, services, whyChooseUs, type Faq as FaqType } from "@/lib/data";
import { breadcrumbSchema, cityServiceSchema, faqSchema } from "@/lib/schema";
import { SITE_URL, site } from "@/lib/site";

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

function cityFaqs(name: string): FaqType[] {
  return [
    {
      q: `Do you offer landscaping services in ${name}?`,
      a: `Yes! E-Care Pro Landscaping proudly serves ${name} with full-service landscaping, irrigation, paver installation, fencing, tree services, yard cleanups, and ongoing property maintenance. We're licensed, insured, and just minutes away.`,
    },
    {
      q: `How much does landscaping cost in ${name}?`,
      a: `Pricing depends on the size and scope of your project. We provide free, transparent, itemized estimates for every ${name} project — with no hidden fees. Call ${site.phones[0].display} to get yours.`,
    },
    {
      q: `Are you licensed and insured to work in ${name}?`,
      a: `Absolutely. Every project we complete in ${name} and across Contra Costa County is backed by full liability insurance and workers' coverage for your complete peace of mind.`,
    },
    {
      q: `How soon can you start my ${name} project?`,
      a: `Cleanups and repairs can often be scheduled within days. Larger design-build projects begin after your free estimate and design approval. Call us for current ${name} availability.`,
    },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return {};

  const place = c.isCounty ? "Contra Costa County" : `${c.name}, CA`;
  const title = c.isCounty
    ? "Landscaping Contractor in Contra Costa County, CA"
    : `Landscaping in ${c.name}, CA | Landscaper Near You`;
  const description = `${c.blurb} E-Care Pro Landscaping offers premium landscaping, pavers, irrigation, fencing & tree services in ${place}. Licensed & insured. Free estimates — call ${site.phones[0].display}.`;

  return {
    title,
    description,
    keywords: [
      `landscaping ${c.name}`,
      `landscaper ${c.name}`,
      `landscaping contractor ${c.name}`,
      `paver installation ${c.name}`,
      `fence contractor ${c.name}`,
      `irrigation ${c.name}`,
      `tree services ${c.name}`,
      "landscaper near me",
    ],
    alternates: { canonical: `/service-areas/${c.slug}` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${SITE_URL}/service-areas/${c.slug}`,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();

  const nearby = cities.filter((x) => x.slug !== c.slug && !x.isCounty).slice(0, 6);
  const faqs = cityFaqs(c.name);
  const trail = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/#areas" },
    { name: c.name, path: `/service-areas/${c.slug}` },
  ];

  return (
    <>
      <JsonLd data={[cityServiceSchema(c), breadcrumbSchema(trail), faqSchema(faqs)]} />

      <PageHero
        eyebrow="Service Area"
        title={
          c.isCounty ? (
            <>
              Landscaping Contractor in <span className="text-fresh-light">Contra Costa County</span>
            </>
          ) : (
            <>
              Landscaping in <span className="text-fresh-light">{c.name}, CA</span>
            </>
          )
        }
        intro={c.intro}
        trail={trail}
        icon="map"
        chips={[`Serving ${c.name}`, "Licensed & Insured", "Free Estimates", "Local Crews"]}
      />

      {/* Local intro */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Photo
              src="/images/services/landscaping.png"
              alt={`Premium landscaping by E-Care Pro Landscaping in ${c.name}, CA`}
              sizes="(max-width:1024px) 100vw, 50vw"
              quality={82}
              label={c.isCounty ? "Contra Costa County, CA" : `${c.name}, California`}
              sublabel="Premium Landscaping"
              className="shadow-card"
            />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow={`Your ${c.name} Landscapers`}
              title={`Premium outdoor spaces, built for ${c.name}`}
              intro={`From design and pavers to irrigation, fences, and tree care, E-Care Pro Landscaping delivers agency-quality results for ${c.name} homeowners and businesses. We know the local climate and soil — and we build landscapes that thrive.`}
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {whyChooseUs.slice(0, 4).map((w) => (
                <li key={w.title} className="flex items-start gap-2.5">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-fresh" strokeWidth={2.5} />
                  <span className="text-sm text-charcoal">
                    <strong className="font-semibold text-charcoal">{w.title}.</strong> {w.text}
                  </span>
                </li>
              ))}
            </ul>
            {c.landmarks.length > 0 && (
              <p className="mt-6 text-sm text-charcoal-light">
                <span className="font-semibold text-charcoal">Areas we serve near {c.name}:</span>{" "}
                {c.landmarks.join(" · ")}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Services in this city */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Our Services"
            title={`What we offer in ${c.name}`}
            intro={`Every service is available throughout ${c.name} and the surrounding area.`}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-cream shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
                >
                  <Photo
                    src={`/images/services/${s.slug}.png`}
                    alt={`${s.name} in ${c.name}, CA by E-Care Pro Landscaping`}
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    rounded="rounded-none"
                    ratio="16 / 9"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-extrabold text-charcoal">
                      {s.name.split(" ")[0]} in {c.name}
                    </h3>
                    <p className="mt-1.5 flex-1 text-sm text-charcoal-light">{s.excerpt}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-forest transition group-hover:gap-2.5">
                      {s.name} <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby areas */}
      {!c.isCounty && (
        <section className="bg-cream py-16 sm:py-20">
          <div className="container-x">
            <SectionHeading eyebrow="Nearby" title="We also serve these communities" />
            <div className="mt-8 flex flex-wrap gap-2.5">
              <Link
                href="/service-areas/contra-costa-county"
                className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white transition hover:bg-forest-dark"
              >
                All of Contra Costa County
              </Link>
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  href={`/service-areas/${n.slug}`}
                  className="rounded-full border border-black/[0.08] bg-white px-4 py-2 text-sm font-semibold text-charcoal transition hover:border-fresh/40 hover:text-forest"
                >
                  Landscaping in {n.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Reviews />
      <FinalCTA defaultCity={c.isCounty ? undefined : c.name} />
      <Faq items={faqs} />
      <Footer />
    </>
  );
}
