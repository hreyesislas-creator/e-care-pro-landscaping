import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { guarantees } from "@/lib/data";

export function Guarantees() {
  return (
    <section className="bg-cream py-20 sm:py-24 scroll-mt-24">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="Our Promise"
          title="Guarantees that protect your investment"
          intro="Hiring a contractor shouldn't be stressful. These commitments are baked into every E-Care Pro project."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((g, i) => (
            <Reveal
              key={g.title}
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className="rounded-3xl bg-white p-6 text-center shadow-card ring-1 ring-black/[0.03]"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-fresh/12 text-fresh">
                <Icon name="check" className="h-7 w-7" strokeWidth={2.5} />
              </span>
              <h3 className="mt-4 font-display text-base font-extrabold text-charcoal">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-light">{g.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
