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
import { services, getService, cities, guarantees } from "@/lib/data";
import { breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/schema";
import { SITE_URL, site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const title = `${service.name} in Bay Point & Contra Costa County, CA`;
  const description = `${service.excerpt} E-Care Pro Landscaping is a licensed & insured ${service.name.toLowerCase()} contractor serving Bay Point, Pittsburg, Antioch, Concord & all of Contra Costa County. Free estimates — call ${site.phones[0].display}.`;

  return {
    title,
    description,
    keywords: [...service.keywords, `${service.keywords[0]} Bay Point`, `${service.keywords[0]} Contra Costa County`],
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${SITE_URL}/services/${service.slug}`,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const trail = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/#services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema(trail),
          faqSchema(),
        ]}
      />

      <PageHero
        eyebrow="Service"
        title={
          <>
            {service.name} <span className="text-fresh-light">in Bay Point &amp; Contra Costa County</span>
          </>
        }
        intro={service.description}
        trail={trail}
        icon={service.icon}
        chips={service.benefits}
      />

      {/* Overview + scope */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Photo
              src={`/images/services/${service.slug}.png`}
              alt={`${service.name} by E-Care Pro Landscaping in Bay Point & Contra Costa County, CA`}
              sizes="(max-width:1024px) 100vw, 50vw"
              quality={82}
              className="shadow-card"
            />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="What's Included"
              title={`Professional ${service.name.toLowerCase()} done right`}
              intro={service.excerpt}
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.scope.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.03]"
                >
                  <Icon name="check" className="h-5 w-5 shrink-0 text-fresh" strokeWidth={2.5} />
                  <span className="text-sm font-medium text-charcoal">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why / guarantees band */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="The E-Care Pro Difference"
            title={`Why homeowners choose us for ${service.name.toLowerCase()}`}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((g, i) => (
              <Reveal
                key={g.title}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                className="rounded-3xl bg-cream p-6 text-center shadow-card"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-fresh/12 text-fresh">
                  <Icon name="check" className="h-6 w-6" strokeWidth={2.5} />
                </span>
                <h3 className="mt-3 font-display text-base font-extrabold text-charcoal">{g.title}</h3>
                <p className="mt-2 text-sm text-charcoal-light">{g.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas for this service */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Service Areas"
            title={`${service.name} across the East Bay`}
            intro={`We provide ${service.name.toLowerCase()} for homes and businesses throughout Contra Costa County. Find your city:`}
          />
          <div className="mt-8 flex flex-wrap gap-2.5">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/service-areas/${c.slug}`}
                className="rounded-full border border-black/[0.08] bg-white px-4 py-2 text-sm font-semibold text-charcoal transition hover:border-fresh/40 hover:text-forest"
              >
                {service.name.split(" ")[0]} in {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Explore More" title="Related services" />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {others.map((s, i) => (
              <Reveal key={s.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-cream shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
                >
                  <Photo
                    src={`/images/services/${s.slug}.png`}
                    alt={`${s.name} by E-Care Pro Landscaping`}
                    sizes="(max-width:640px) 100vw, 33vw"
                    rounded="rounded-none"
                    ratio="16 / 9"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-extrabold text-charcoal">{s.name}</h3>
                    <p className="mt-1.5 flex-1 text-sm text-charcoal-light">{s.excerpt}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-forest transition group-hover:gap-2.5">
                      Learn more <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reviews />
      <FinalCTA defaultService={service.name} />
      <Faq />
      <Footer />
    </>
  );
}
