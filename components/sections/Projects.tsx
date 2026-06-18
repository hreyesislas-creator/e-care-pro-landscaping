import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { projects } from "@/lib/data";

// Only show projects whose image asset actually exists in /public (server-side check at build).
const availableProjects = projects.filter((p) =>
  existsSync(join(process.cwd(), "public", p.image))
);

export function Projects() {
  return (
    <section id="projects" className="bg-charcoal py-20 text-white sm:py-28 scroll-mt-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            light
            eyebrow="Featured Projects"
            title={
              <>
                Recent work across
                <br className="hidden sm:block" /> Contra Costa County
              </>
            }
            intro="A look at the landscapes, patios, and outdoor spaces we've built for homeowners and businesses throughout the East Bay."
          />
          <Reveal delay={2}>
            <Link
              href="/#estimate"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 px-6 py-3 font-display font-bold text-white transition hover:bg-white/10"
            >
              Start your project →
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {availableProjects.map((p, i) => (
            <Reveal key={p.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div className="group relative h-full overflow-hidden rounded-3xl ring-1 ring-white/10 transition-all duration-300 hover:ring-white/30">
                <Photo
                  src={p.image}
                  alt={`${p.title} — ${p.category} project by E-Care Pro Landscaping in ${p.city}, CA`}
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  label={p.title}
                  sublabel={`${p.category} · ${p.city}`}
                  rounded="rounded-none"
                  className="transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
