"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4 | 5;
  as?: keyof React.JSX.IntrinsicElements;
};

/**
 * Progressive scroll-reveal wrapper. Content is fully visible without JS
 * (server-rendered with no opacity), and animates in once observed.
 */
export function Reveal({ children, className = "", delay, as = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true); // enable hidden state only after hydration
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as React.ElementType;
  const delayClass = delay ? ` reveal-delay-${delay}` : "";
  return (
    <Tag
      ref={ref}
      className={`${active ? "reveal" + delayClass : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
