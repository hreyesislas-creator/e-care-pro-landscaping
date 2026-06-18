import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";

function Tag({ label, tone }: { label: string; tone: "before" | "after" }) {
  const cls =
    tone === "before"
      ? "bg-charcoal/85 text-white"
      : "bg-fresh text-white";
  return (
    <span
      className={`absolute left-4 top-4 z-10 rounded-full px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wider shadow-soft ${cls}`}
    >
      {label}
    </span>
  );
}

export function BeforeAfter() {
  return (
    <section id="transformations" className="bg-cream py-20 sm:py-28 scroll-mt-24">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="The Transformation"
          title="See the E-Care Pro difference"
          intro="From tired and overgrown to refined and effortless — here's what a full E-Care Pro landscape transformation looks like."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <Reveal delay={1}>
            <div className="relative">
              <Tag label="Before" tone="before" />
              <Photo
                src="/images/before-after/landscaping-before.png"
                alt="Front yard before E-Care Pro Landscaping transformation — patchy lawn and overgrown beds"
                sizes="(max-width:768px) 100vw, 50vw"
                quality={80}
                ratio="3 / 2"
                className="shadow-card"
              />
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="relative">
              <Tag label="After" tone="after" />
              <Photo
                src="/images/before-after/landscaping-after.png"
                alt="The same front yard after E-Care Pro Landscaping transformation — lush lawn, new paver walkway and planting"
                sizes="(max-width:768px) 100vw, 50vw"
                quality={80}
                ratio="3 / 2"
                className="shadow-card"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
