/**
 * Content + SEO data layer for E-Care Pro Landscaping.
 * Drives the home page, dynamic service pages, and city landing pages.
 */

export type Service = {
  slug: string;
  name: string;
  short: string; // card subtitle
  excerpt: string; // 1–2 sentence summary
  description: string; // long-form for service page hero
  benefits: string[];
  scope: string[]; // what's included
  icon: IconName;
  gradient: [string, string]; // from -> to (hex) for the visual
  keywords: string[];
};

export type City = {
  slug: string;
  name: string;
  isCounty?: boolean;
  zip?: string;
  blurb: string; // short, used on cards
  intro: string; // long-form for city page
  landmarks: string[];
};

export type Review = {
  name: string;
  city: string;
  rating: number;
  service: string;
  text: string;
};

export type Faq = { q: string; a: string };

export type IconName =
  | "leaf"
  | "droplet"
  | "fence"
  | "paver"
  | "tree"
  | "rake"
  | "shield"
  | "phone"
  | "star"
  | "check"
  | "map"
  | "clock"
  | "award"
  | "sparkle"
  | "wrench"
  | "calendar";

/* ---------------------------------------------------------------- Services */
export const services: Service[] = [
  {
    slug: "landscaping",
    name: "Landscaping & Design",
    short: "Full-service design & build",
    excerpt:
      "Custom landscape design and installation that transforms ordinary yards into refined outdoor living spaces.",
    description:
      "From concept to completion, our landscape designers and crews build front yards, backyards, and commercial grounds that look intentional, mature, and high-end. We balance hardscape, planting, lighting, and grading into a cohesive design tailored to your property and the Bay Area climate.",
    benefits: [
      "3D-informed custom design",
      "Drought-smart, California-native planting",
      "Premium soil prep & grading",
      "Low-voltage landscape lighting",
    ],
    scope: [
      "Front & backyard design",
      "Sod & artificial turf",
      "Planting beds & mulch",
      "Retaining walls & grading",
      "Outdoor lighting",
      "Commercial grounds",
    ],
    icon: "leaf",
    gradient: ["#1b5e20", "#43a047"],
    keywords: [
      "landscaping",
      "landscape design",
      "landscaper",
      "backyard landscaping",
      "front yard landscaping",
    ],
  },
  {
    slug: "irrigation-systems",
    name: "Irrigation Systems",
    short: "Smart, water-saving systems",
    excerpt:
      "Efficient sprinkler and drip irrigation that keeps landscapes lush while lowering your water bill.",
    description:
      "We design, install, and repair smart irrigation systems engineered for California water conservation. Weather-based controllers, high-efficiency drip lines, and properly zoned sprinklers deliver the right amount of water exactly where it's needed — saving money and protecting your investment.",
    benefits: [
      "WaterSense smart controllers",
      "Drip & high-efficiency zones",
      "Leak detection & repair",
      "Seasonal tune-ups",
    ],
    scope: [
      "New irrigation installation",
      "Drip conversion",
      "Smart controller setup",
      "Sprinkler repair",
      "Valve & line repair",
      "System winterization",
    ],
    icon: "droplet",
    gradient: ["#0f5c5c", "#43a047"],
    keywords: [
      "irrigation installation",
      "sprinkler repair",
      "drip irrigation",
      "irrigation systems",
    ],
  },
  {
    slug: "fence-installation-repair",
    name: "Fence Installation & Repair",
    short: "Privacy, security & curb appeal",
    excerpt:
      "Beautiful, durable fencing — wood, vinyl, and ornamental — installed and repaired to last.",
    description:
      "A great fence adds privacy, security, and value. As a trusted fence contractor in Contra Costa County, we build and repair wood, vinyl, and ornamental metal fences with proper concrete-set posts and clean lines that hold up to Bay Area weather for years.",
    benefits: [
      "Cedar, redwood & vinyl options",
      "Concrete-set posts",
      "Custom gates & hardware",
      "Storm & impact repairs",
    ],
    scope: [
      "Wood & redwood fencing",
      "Vinyl fencing",
      "Ornamental metal",
      "Gates & gate automation",
      "Post replacement",
      "Fence repair & restaining",
    ],
    icon: "fence",
    gradient: ["#5a3b1a", "#a9742f"],
    keywords: [
      "fence contractor",
      "fence installation",
      "fence repair",
      "wood fence",
      "vinyl fence",
    ],
  },
  {
    slug: "paver-installation",
    name: "Paver Installation",
    short: "Patios, driveways & walkways",
    excerpt:
      "Premium paver patios, driveways, and walkways engineered for beauty and decades of durability.",
    description:
      "Interlocking pavers create stunning, low-maintenance patios, driveways, walkways, and pool decks. Our hardscape crews build on a properly compacted base with polymeric sand and edge restraints so your investment stays level, weed-free, and beautiful for decades.",
    benefits: [
      "Engineered compacted base",
      "Polymeric sand & sealing",
      "Permeable paver options",
      "Fire pits & seat walls",
    ],
    scope: [
      "Paver patios",
      "Paver driveways",
      "Walkways & pathways",
      "Pool decks",
      "Retaining & seat walls",
      "Fire pits & outdoor kitchens",
    ],
    icon: "paver",
    gradient: ["#6b4a2b", "#c8a24a"],
    keywords: [
      "paver installation",
      "paver patio",
      "paver driveway",
      "hardscaping",
      "walkway installation",
    ],
  },
  {
    slug: "tree-services",
    name: "Tree Services",
    short: "Trimming, pruning & removal",
    excerpt:
      "Professional tree trimming, pruning, and safe removal to keep your property healthy and safe.",
    description:
      "Healthy, well-shaped trees protect your property and boost curb appeal. Our crews handle pruning, crown thinning, shaping, stump grinding, and safe removals with the right equipment — keeping your landscape safe, tidy, and thriving year-round.",
    benefits: [
      "Health & structure pruning",
      "Safe removals & rigging",
      "Stump grinding",
      "Storm cleanup",
    ],
    scope: [
      "Tree trimming & pruning",
      "Crown thinning & shaping",
      "Tree & stump removal",
      "Stump grinding",
      "Hedge shaping",
      "Storm damage cleanup",
    ],
    icon: "tree",
    gradient: ["#234d20", "#5a8f3c"],
    keywords: [
      "tree services",
      "tree trimming",
      "tree removal",
      "stump grinding",
      "tree pruning",
    ],
  },
  {
    slug: "yard-cleanups",
    name: "Yard Cleanups",
    short: "Seasonal & one-time cleanups",
    excerpt:
      "Thorough seasonal and one-time cleanups that restore overgrown, cluttered yards to pristine condition.",
    description:
      "Whether you're prepping to sell, recovering from a storm, or just behind on yard work, our cleanup crews clear overgrowth, leaves, weeds, and debris — and haul it all away. You get a fresh, polished property without lifting a finger.",
    benefits: [
      "Full debris haul-away",
      "Weed & overgrowth removal",
      "Leaf & storm cleanup",
      "Pre-sale yard makeovers",
    ],
    scope: [
      "Seasonal cleanups",
      "Weed removal",
      "Leaf removal",
      "Brush & overgrowth clearing",
      "Debris haul-away",
      "Pre-sale prep",
    ],
    icon: "rake",
    gradient: ["#3b6b2f", "#7cb342"],
    keywords: [
      "yard cleanup",
      "yard cleanup service",
      "weed removal",
      "leaf removal",
      "brush clearing",
    ],
  },
  {
    slug: "property-maintenance",
    name: "Property Maintenance",
    short: "Year-round care plans",
    excerpt:
      "Reliable recurring maintenance that keeps residential and commercial properties looking their best.",
    description:
      "Set it and forget it. Our recurring maintenance plans keep lawns, beds, hedges, and irrigation in peak condition all year. Perfect for busy homeowners, HOAs, and commercial properties that demand a consistently sharp, professional appearance.",
    benefits: [
      "Weekly & bi-weekly plans",
      "Residential & commercial",
      "HOA & multi-site service",
      "Single, reliable crew",
    ],
    scope: [
      "Mowing & edging",
      "Bed & hedge maintenance",
      "Fertilization programs",
      "Irrigation monitoring",
      "Seasonal color rotation",
      "Commercial & HOA contracts",
    ],
    icon: "calendar",
    gradient: ["#1b5e20", "#2e7d32"],
    keywords: [
      "property maintenance",
      "landscape maintenance",
      "commercial landscaping",
      "lawn maintenance",
      "HOA landscaping",
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

/* ------------------------------------------------------------------ Cities */
export const cities: City[] = [
  {
    slug: "bay-point",
    name: "Bay Point",
    zip: "94565",
    blurb:
      "Our hometown. Fast, local crews for landscaping, pavers, fences, and full property care.",
    intro:
      "E-Care Pro Landscaping is headquartered right here in Bay Point, CA. As your neighbors, we know the local soil, the delta climate, and what it takes to build outdoor spaces that thrive. From West Pittsburg neighborhoods to homes near the waterfront, we deliver premium landscaping, irrigation, paver, fence, and tree services with true local speed.",
    landmarks: [
      "Ambrose Park",
      "Riverview Middle School area",
      "Bay Point waterfront",
      "Willow Pass corridor",
    ],
  },
  {
    slug: "pittsburg",
    name: "Pittsburg",
    blurb:
      "Premium landscaping & hardscaping for Pittsburg homes and businesses.",
    intro:
      "Just minutes from our Bay Point home base, Pittsburg is one of our most-served communities. We design and build landscapes, paver patios and driveways, fences, and irrigation systems for neighborhoods from Old Town to the hills above Highway 4 — with the reliability and finish quality Pittsburg property owners expect.",
    landmarks: [
      "Downtown Pittsburg / Old Town",
      "Marina district",
      "Los Medanos area",
      "Highway 4 corridor",
    ],
  },
  {
    slug: "antioch",
    name: "Antioch",
    blurb:
      "Trusted Antioch landscaper for design, pavers, fences & maintenance.",
    intro:
      "Antioch's mix of established neighborhoods and newer developments calls for landscaping that's both beautiful and built to last. Our crews handle everything from drought-smart front yards and paver driveways to fence installation and ongoing property maintenance throughout Antioch and the surrounding East County.",
    landmarks: [
      "Downtown Rivertown",
      "Lone Tree Way corridor",
      "Deer Valley area",
      "Prewett Family Park",
    ],
  },
  {
    slug: "concord",
    name: "Concord",
    blurb:
      "High-end landscaping & outdoor construction across Concord.",
    intro:
      "Concord homeowners and businesses trust E-Care Pro for elevated landscape design, hardscaping, and dependable maintenance. From Todos Santos Plaza-area homes to the spreading neighborhoods near Clayton Valley, we create polished, low-maintenance outdoor spaces tuned to the local climate.",
    landmarks: [
      "Todos Santos Plaza",
      "Clayton Valley",
      "Dana Estates",
      "Willow Pass area",
    ],
  },
  {
    slug: "walnut-creek",
    name: "Walnut Creek",
    blurb:
      "Luxury landscape design & maintenance for Walnut Creek properties.",
    intro:
      "Walnut Creek's upscale homes deserve upscale landscaping. We specialize in refined landscape design, premium pavers, custom fencing, and meticulous maintenance that complements the area's beautiful properties — from Rossmoor to the neighborhoods near downtown and Mt. Diablo.",
    landmarks: [
      "Downtown Walnut Creek",
      "Rossmoor",
      "Northgate",
      "Mt. Diablo foothills",
    ],
  },
  {
    slug: "brentwood",
    name: "Brentwood",
    blurb:
      "Complete landscaping & irrigation for Brentwood's growing communities.",
    intro:
      "Brentwood's warm climate and newer homes are perfect for thoughtful, water-wise landscaping. We install efficient irrigation, design striking front and backyards, build paver patios, and provide reliable maintenance that keeps Brentwood properties looking sharp through the East County summers.",
    landmarks: [
      "Downtown Brentwood",
      "Streets of Brentwood",
      "Shadow Lakes",
      "Brentwood Family Aquatic Complex",
    ],
  },
  {
    slug: "martinez",
    name: "Martinez",
    blurb: "Dependable landscaping & tree services across Martinez.",
    intro:
      "From historic downtown Martinez to the hillside neighborhoods, we deliver landscaping, tree services, fencing, and maintenance built for the area's varied terrain and mature trees. As the county seat, Martinez homes and commercial sites get the same premium, licensed-and-insured care we're known for.",
    landmarks: [
      "Downtown Martinez",
      "Martinez Marina",
      "Alhambra Valley",
      "John Muir Historic Site area",
    ],
  },
  {
    slug: "pleasant-hill",
    name: "Pleasant Hill",
    blurb: "Elegant landscaping & hardscaping for Pleasant Hill homes.",
    intro:
      "Pleasant Hill's tree-lined, family-friendly neighborhoods are a perfect fit for our design-and-build approach. We create inviting front yards, durable paver patios, custom fences, and tidy, well-maintained landscapes throughout Pleasant Hill and the central county.",
    landmarks: [
      "Downtown Pleasant Hill",
      "Gregory Gardens",
      "Poets Corner",
      "Pleasant Hill Park",
    ],
  },
  {
    slug: "oakley",
    name: "Oakley",
    blurb: "Water-smart landscaping & irrigation for Oakley properties.",
    intro:
      "Oakley's sunny East County setting demands smart, water-efficient landscaping. We design drought-tolerant yards, install high-efficiency irrigation, build pavers and fences, and keep properties immaculate with recurring maintenance tailored to the local climate.",
    landmarks: [
      "Downtown Oakley",
      "Cypress Corridor",
      "Summer Lake",
      "Big Break Regional Shoreline",
    ],
  },
  {
    slug: "contra-costa-county",
    name: "Contra Costa County",
    isCounty: true,
    blurb:
      "Premium landscaping & outdoor construction county-wide — residential & commercial.",
    intro:
      "E-Care Pro Landscaping serves all of Contra Costa County with premium landscaping, irrigation, paver, fence, tree, and property maintenance services. Licensed, insured, and locally owned, we bring agency-quality design and contractor-grade craftsmanship to homes, HOAs, and commercial properties across the entire county.",
    landmarks: [
      "East County",
      "Central County",
      "Diablo Valley",
      "Highway 4 & I-680 corridors",
    ],
  },
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}

export const primaryCity = cities[0]; // Bay Point

/* ----------------------------------------------------------------- Reviews */
export const reviews: Review[] = [
  {
    name: "Marcus D.",
    city: "Bay Point, CA",
    rating: 5,
    service: "Paver Patio & Landscaping",
    text:
      "E-Care Pro completely transformed our backyard. The paver patio is flawless and the crew was professional, on time, and cleaned up every day. Best landscaping contractor in Bay Point, hands down.",
  },
  {
    name: "Jennifer R.",
    city: "Antioch, CA",
    rating: 5,
    service: "Front Yard Redesign",
    text:
      "They redesigned our entire front yard with drought-tolerant plants and a new irrigation system. Our water bill dropped and the curb appeal is unreal. Highly recommend.",
  },
  {
    name: "David & Lena P.",
    city: "Concord, CA",
    rating: 5,
    service: "Fence Installation",
    text:
      "Replaced 120 feet of fencing with beautiful redwood. Posts set in concrete, perfectly straight, custom gate. Fair quote and zero surprises. True professionals.",
  },
  {
    name: "Sofia M.",
    city: "Pittsburg, CA",
    rating: 5,
    service: "Yard Cleanup & Maintenance",
    text:
      "We were embarrassed by how overgrown things got. They cleared everything in a day and now keep it perfect on a bi-weekly plan. Reliable and worth every penny.",
  },
  {
    name: "Robert K.",
    city: "Walnut Creek, CA",
    rating: 5,
    service: "Landscape Design & Pavers",
    text:
      "Agency-level design and execution. The walkway, lighting, and planting all came together exactly like the plan. Our home looks like it belongs in a magazine.",
  },
  {
    name: "Priya S.",
    city: "Brentwood, CA",
    rating: 5,
    service: "Irrigation Installation",
    text:
      "Smart controller and drip system installed in one day. Everything's zoned perfectly and the app control is fantastic. Knowledgeable, tidy, and genuinely nice people.",
  },
];

/* -------------------------------------------------------------------- FAQs */
export const faqs: Faq[] = [
  {
    q: "What areas does E-Care Pro Landscaping serve?",
    a: "We're based in Bay Point, CA and proudly serve all of Contra Costa County — including Pittsburg, Antioch, Concord, Walnut Creek, Brentwood, Martinez, Pleasant Hill, and Oakley. If you're searching for a 'landscaper near me' in the East Bay, we've got you covered.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. E-Care Pro Landscaping is fully licensed and insured. Every project is backed by liability insurance and workers' coverage, so your property and our crews are always protected.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Absolutely. We provide free, no-obligation estimates for all services. Call us at (925) 464-9129 or request a quote online and we'll schedule a convenient time to assess your property.",
  },
  {
    q: "How much does landscaping or paver installation cost in Contra Costa County?",
    a: "Every project is different, so pricing depends on scope, materials, and site conditions. We provide transparent, itemized estimates up front with no hidden fees — and we'll work with you to fit your budget.",
  },
  {
    q: "Do you handle both residential and commercial properties?",
    a: "Yes. We serve homeowners, HOAs, property managers, and commercial clients throughout Contra Costa County with both one-time projects and recurring maintenance contracts.",
  },
  {
    q: "How quickly can you start my project?",
    a: "For cleanups and repairs we can often schedule within days. Larger design-build projects are scheduled after your free estimate and design approval. Call us for current availability.",
  },
];

/* -------------------------------------------------------------- Why / Trust */
export const whyChooseUs = [
  {
    icon: "shield" as IconName,
    title: "Licensed & Insured",
    text: "Fully licensed and insured for your complete peace of mind on every project.",
  },
  {
    icon: "map" as IconName,
    title: "Locally Owned",
    text: "Based in Bay Point and rooted in Contra Costa County — your neighbors, not a franchise.",
  },
  {
    icon: "award" as IconName,
    title: "Premium Craftsmanship",
    text: "Agency-quality design paired with contractor-grade execution and durable materials.",
  },
  {
    icon: "sparkle" as IconName,
    title: "Spotless Job Sites",
    text: "We protect your property and leave it cleaner than we found it — every single day.",
  },
  {
    icon: "clock" as IconName,
    title: "On Time, On Budget",
    text: "Clear timelines, transparent pricing, and reliable crews that show up when promised.",
  },
  {
    icon: "star" as IconName,
    title: "5-Star Reputation",
    text: "Hundreds of happy homeowners and businesses across the East Bay trust our work.",
  },
];

export const guarantees = [
  {
    title: "Free, No-Pressure Estimates",
    text: "Transparent, itemized quotes with no hidden fees — ever.",
  },
  {
    title: "Workmanship Guarantee",
    text: "We stand behind our craftsmanship and make it right if anything isn't perfect.",
  },
  {
    title: "On-Time Completion Pledge",
    text: "Clear schedules and dependable crews that respect your time.",
  },
  {
    title: "Clean & Respectful Crews",
    text: "Daily cleanup and total respect for your property and neighbors.",
  },
];

export const stats = [
  { value: "10+", label: "Years Serving the East Bay" },
  { value: "1,200+", label: "Projects Completed" },
  { value: "4.9★", label: "Average Customer Rating" },
  { value: "100%", label: "Licensed & Insured" },
];

/* ----------------------------------------------------------------- Projects */
export type Project = {
  title: string;
  category: string;
  city: string;
  gradient: [string, string];
  icon: IconName;
};

export const projects: Project[] = [
  { title: "Modern Paver Patio & Fire Pit", category: "Paver Installation", city: "Bay Point", gradient: ["#6b4a2b", "#c8a24a"], icon: "paver" },
  { title: "Drought-Smart Front Yard", category: "Landscape Design", city: "Antioch", gradient: ["#1b5e20", "#66bb6a"], icon: "leaf" },
  { title: "Redwood Privacy Fence", category: "Fence Installation", city: "Concord", gradient: ["#5a3b1a", "#a9742f"], icon: "fence" },
  { title: "Smart Drip Irrigation Retrofit", category: "Irrigation", city: "Brentwood", gradient: ["#0f5c5c", "#43a047"], icon: "droplet" },
  { title: "Backyard Living Transformation", category: "Landscape Build", city: "Walnut Creek", gradient: ["#234d20", "#7cb342"], icon: "sparkle" },
  { title: "Oak Canopy Pruning & Cleanup", category: "Tree Services", city: "Martinez", gradient: ["#2e4d24", "#5a8f3c"], icon: "tree" },
];
