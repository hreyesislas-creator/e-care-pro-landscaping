/**
 * Central business / NAP (Name, Address, Phone) configuration.
 * Single source of truth for SEO, schema, and UI.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.ecareprolandscaping.com";

export const site = {
  name: "E-Care Pro Landscaping",
  legalName: "E-Care Pro Landscaping",
  shortName: "E-Care Pro",
  tagline: "Premium Landscaping & Outdoor Construction in Contra Costa County",
  description:
    "E-Care Pro Landscaping is a premium, licensed & insured landscaping contractor serving Bay Point and all of Contra Costa County, CA. Landscaping, irrigation, fences, pavers, tree services, yard cleanups & property maintenance for residential and commercial properties.",
  url: SITE_URL,
  email: "info@ecareprolandscaping.com",
  phones: [
    { label: "Main", display: "(925) 464-9129", tel: "+19254649129" },
    { label: "Alternate", display: "(925) 768-1363", tel: "+19257681363" },
  ],
  address: {
    street: "172 Cleveland Ave",
    city: "Bay Point",
    region: "CA",
    regionName: "California",
    postalCode: "94565",
    country: "US",
    full: "172 Cleveland Ave, Bay Point, CA 94565",
  },
  geo: {
    latitude: 38.0282,
    longitude: -121.9466,
  },
  hours: [
    { day: "Monday", open: "07:00", close: "18:00" },
    { day: "Tuesday", open: "07:00", close: "18:00" },
    { day: "Wednesday", open: "07:00", close: "18:00" },
    { day: "Thursday", open: "07:00", close: "18:00" },
    { day: "Friday", open: "07:00", close: "18:00" },
    { day: "Saturday", open: "08:00", close: "16:00" },
  ],
  hoursLabel: "Mon–Fri 7am–6pm · Sat 8am–4pm",
  priceRange: "$$",
  founded: "2014",
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    google: "https://www.google.com/maps",
    yelp: "https://www.yelp.com/",
  },
  rating: {
    value: 4.9,
    count: 187,
  },
} as const;

export const primaryPhone = site.phones[0];
