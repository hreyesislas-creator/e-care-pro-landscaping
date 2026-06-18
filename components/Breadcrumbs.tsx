import Link from "next/link";

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-white/70">
        {trail.map((t, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={t.path} className="flex items-center gap-1.5">
              {last ? (
                <span className="font-semibold text-fresh-light" aria-current="page">
                  {t.name}
                </span>
              ) : (
                <>
                  <Link href={t.path} className="transition hover:text-white">
                    {t.name}
                  </Link>
                  <span aria-hidden="true" className="text-white/35">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
