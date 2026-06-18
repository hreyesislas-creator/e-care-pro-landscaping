import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { reviews } from "@/lib/data";
import { site } from "@/lib/site";

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5 text-gold" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Icon key={i} name="star" className="h-5 w-5" strokeWidth={1} />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="bg-white py-20 sm:py-28 scroll-mt-24">
      <div className="container-x">
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            center
            eyebrow="Reviews"
            title="Loved by homeowners across the East Bay"
          />
          <Reveal
            delay={2}
            className="mt-5 inline-flex items-center gap-3 rounded-full bg-cream px-5 py-2.5 shadow-card"
          >
            <span className="flex text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="star" className="h-5 w-5" strokeWidth={1} />
              ))}
            </span>
            <span className="font-display font-extrabold text-charcoal">
              {site.rating.value}/5
            </span>
            <span className="text-sm text-charcoal/65">
              from {site.rating.count}+ happy customers
            </span>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal
              key={r.name}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="flex h-full flex-col rounded-3xl border border-black/[0.06] bg-cream p-6 shadow-card"
            >
              <div className="flex items-center justify-between">
                <Stars count={r.rating} />
                <span className="rounded-full bg-forest/8 px-2.5 py-1 text-xs font-semibold text-forest">
                  {r.service}
                </span>
              </div>
              <p className="mt-4 flex-1 leading-relaxed text-charcoal">“{r.text}”</p>
              <div className="mt-5 flex items-center gap-3 border-t border-black/[0.06] pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest font-display font-bold text-white">
                  {r.name.charAt(0)}
                </span>
                <div>
                  <div className="font-display text-sm font-bold text-charcoal">{r.name}</div>
                  <div className="text-xs text-charcoal/60">{r.city}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
