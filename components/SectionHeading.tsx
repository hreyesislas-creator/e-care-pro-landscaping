import { Reveal } from "@/components/Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  center?: boolean;
  light?: boolean;
};

export function SectionHeading({ eyebrow, title, intro, center = false, light = false }: Props) {
  return (
    <Reveal
      className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}
    >
      <p className={`eyebrow ${light ? "text-fresh-light" : "text-fresh"}`}>{eyebrow}</p>
      <h2
        className={`mt-3 font-display text-3xl font-extrabold leading-[1.08] sm:text-4xl md:text-[2.75rem] ${
          light ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/75" : "text-charcoal-light"}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
