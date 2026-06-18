import type { IconName } from "@/lib/data";

type Props = {
  name: IconName;
  className?: string;
  strokeWidth?: number;
};

/* Clean, consistent line icons (24x24 grid). */
const paths: Record<IconName, React.ReactNode> = {
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 4 13c0-5 4.5-9 16-9 0 8-3.5 16-9 16Z" />
      <path d="M4 20c4-6 8-9 13-10" />
    </>
  ),
  droplet: <path d="M12 3s6 6 6 10a6 6 0 1 1-12 0c0-4 6-10 6-10Z" />,
  fence: (
    <>
      <path d="M4 7l2-2 2 2v13H4zM16 7l2-2 2 2v13h-4z" />
      <path d="M9 7l2-2 2 2v13H9z" />
      <path d="M2 11h20M2 16h20" />
    </>
  ),
  paver: (
    <>
      <rect x="3" y="4" width="8" height="6" rx="1" />
      <rect x="13" y="4" width="8" height="6" rx="1" />
      <rect x="3" y="14" width="8" height="6" rx="1" />
      <rect x="13" y="14" width="8" height="6" rx="1" />
    </>
  ),
  tree: (
    <>
      <path d="M12 2 6 11h3l-3 5h12l-3-5h3L12 2Z" />
      <path d="M12 16v6" />
    </>
  ),
  rake: (
    <>
      <path d="M4 14h16M5 14V9m4.5 5V9M14.5 14V9M19 14V9" />
      <path d="M12 14v8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  phone: (
    <path d="M5 4h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  star: (
    <path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6L12 17.8 6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z" />
  ),
  check: <path d="m5 12 4.5 4.5L19 7" />,
  map: (
    <>
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="m8.5 13-1.5 8 5-3 5 3-1.5-8" />
    </>
  ),
  sparkle: (
    <path d="M12 3c.6 4.5 1.5 5.4 6 6-4.5.6-5.4 1.5-6 6-.6-4.5-1.5-5.4-6-6 4.5-.6 5.4-1.5 6-6Z" />
  ),
  wrench: (
    <path d="M14 7a4 4 0 0 1-5 5L5 16l3 3 4-4a4 4 0 0 0 5-5l-2 2-2-2 2-2-1-1Z" />
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </>
  ),
};

export function Icon({ name, className, strokeWidth = 1.75 }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
