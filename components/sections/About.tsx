import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { Icon } from "@/components/Icon";
import { CallButton } from "@/components/Buttons";
import { site } from "@/lib/site";

const points = [
  "Locally owned & operated in Bay Point",
  "One dedicated, professional crew per project",
  "Clean, respectful, on-time service",
  "Residential & commercial expertise",
];

export function About() {
  return (
    <section id="about" className="bg-white py-20 sm:py-28 scroll-mt-24">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Photo
            src="/images/team/crew.png"
            alt="The professional E-Care Pro Landscaping crew on a manicured property in Contra Costa County"
            sizes="(max-width:1024px) 100vw, 50vw"
            quality={82}
            ratio="3 / 2"
            className="shadow-card"
          />
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="Meet E-Care Pro"
            title="Your local crew, invested in every detail"
            intro={`Since ${site.founded}, E-Care Pro Landscaping has helped homeowners and businesses across the East Bay create outdoor spaces they're proud of. We're not a faceless franchise — we're your neighbors, and our name is on every project we deliver.`}
          />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2.5">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-fresh" strokeWidth={2.5} />
                <span className="text-sm font-medium text-charcoal">{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <CallButton size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
