import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { faqs as defaultFaqs, type Faq } from "@/lib/data";

export function Faq({ items = defaultFaqs, light = false }: { items?: Faq[]; light?: boolean }) {
  return (
    <section
      id="faq"
      className={`py-20 sm:py-28 scroll-mt-24 ${light ? "bg-charcoal" : "bg-white"}`}
    >
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          light={light}
          eyebrow="FAQ"
          title="Questions, answered"
          intro="Everything you need to know before starting your project. Still curious? Just give us a call."
        />
        <Reveal className="divide-y divide-black/[0.08]">
          {items.map((f, i) => (
            <details
              key={i}
              className={`group py-4 ${light ? "text-white" : "text-charcoal"}`}
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                <span>{f.q}</span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fresh/12 text-fresh transition group-open:rotate-45">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className={`mt-3 max-w-2xl leading-relaxed ${light ? "text-white/70" : "text-charcoal-light"}`}>
                {f.a}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
