import { SITE_URL, site } from "@/lib/site";
import { services, cities, reviews, faqs, type Service, type City } from "@/lib/data";

const BUSINESS_ID = `${SITE_URL}/#business`;

const dayMap: Record<string, string> = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Sunday: "Sunday",
};

/** Core LocalBusiness / LandscapingBusiness node (referenced by @id elsewhere). */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LandscapingBusiness", "GeneralContractor", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: SITE_URL,
    telephone: site.phones[0].tel,
    email: site.email,
    image: `${SITE_URL}/opengraph-image`,
    logo: `${SITE_URL}/icon.svg`,
    priceRange: site.priceRange,
    foundingDate: site.founded,
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Check, Credit Card",
    // Service-area business: no streetAddress / PostalAddress / geo / hasMap published.
    serviceArea: [
      { "@type": "AdministrativeArea", name: "Contra Costa County, California" },
      ...cities
        .filter((c) => !c.isCounty)
        .map((c) => ({ "@type": "City", name: `${c.name}, CA` })),
    ],
    telephoneNumbers: site.phones.map((p) => p.tel),
    contactPoint: site.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.tel,
      contactType: "customer service",
      areaServed: "US-CA",
      availableLanguage: ["English", "Spanish"],
    })),
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${dayMap[h.day]}`,
      opens: h.open,
      closes: h.close,
    })),
    areaServed: cities.map((c) =>
      c.isCounty
        ? { "@type": "AdministrativeArea", name: "Contra Costa County, CA" }
        : { "@type": "City", name: `${c.name}, CA` }
    ),
    sameAs: [site.social.facebook, site.social.instagram, site.social.yelp],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name },
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Landscaping & Outdoor Construction Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          url: `${SITE_URL}/services/${s.slug}`,
        },
      })),
    },
    review: reviews.slice(0, 4).map((r) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      author: { "@type": "Person", name: r.name },
      reviewBody: r.text,
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: site.name,
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "en-US",
  };
}

export function faqSchema(items = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.excerpt,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: cities.map((c) =>
      c.isCounty
        ? { "@type": "AdministrativeArea", name: "Contra Costa County, CA" }
        : { "@type": "City", name: `${c.name}, CA` }
    ),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} options`,
      itemListElement: service.scope.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };
}

/** Per-city service area schema. */
export function cityServiceSchema(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Landscaping in ${city.name}, CA`,
    description: city.blurb,
    url: `${SITE_URL}/service-areas/${city.slug}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: city.isCounty
      ? { "@type": "AdministrativeArea", name: "Contra Costa County, CA" }
      : { "@type": "City", name: `${city.name}, CA` },
    serviceType: services.map((s) => s.name),
  };
}
