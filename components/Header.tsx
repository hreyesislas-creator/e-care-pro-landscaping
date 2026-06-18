"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { primaryPhone, site } from "@/lib/site";

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#why", label: "Why Us" },
  { href: "/#projects", label: "Projects" },
  { href: "/#areas", label: "Service Areas" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Subtle text shadow lifts white text off the hero for readability.
  const textShadow = { textShadow: "0 1px 3px rgba(0,0,0,0.35)" };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative mx-auto mt-5 w-[95%] max-w-[1400px]">
        {/* Floating glass navigation bar */}
        <div
          className="flex items-center justify-between rounded-[20px] px-4 py-2.5 sm:px-6"
          style={{
            // Light frosted glass over the hero; darkens once scrolled past the
            // hero so white text stays readable over light page content below.
            backgroundColor: scrolled ? "rgba(10,28,14,0.82)" : "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            transition: "background-color 300ms ease, box-shadow 300ms ease",
          }}
        >
          <Link
            href="/"
            aria-label={`${site.name} home`}
            className="flex shrink-0 items-center gap-2.5"
          >
            {/* Shield mark (transparent PNG) + white wordmark so the brand stays
                crisp and readable on the translucent/dark glass bar. */}
            <Image
              src="/images/branding/logo-mark.png"
              alt=""
              width={512}
              height={512}
              priority
              sizes="40px"
              className="h-9 w-9 object-contain lg:h-10 lg:w-10"
            />
            <span className="flex flex-col leading-none" style={textShadow}>
              <span className="font-display text-base font-extrabold tracking-tight text-white lg:text-lg">
                E-CARE <span className="text-fresh-light">PRO</span>
              </span>
              <span className="mt-1 font-display text-[0.5rem] font-semibold tracking-[0.32em] text-white/80 lg:text-[0.55rem]">
                LANDSCAPING
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                style={textShadow}
                className="text-sm font-semibold text-white/90 transition-colors duration-200 hover:text-fresh-light"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href={`tel:${primaryPhone.tel}`}
              style={textShadow}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-white/90 transition-colors duration-200 hover:text-fresh-light"
            >
              <Icon name="phone" className="h-4 w-4" />
              {primaryPhone.display}
            </a>
            <Link
              href="/#estimate"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-charcoal shadow-soft transition hover:bg-gold-light hover:-translate-y-0.5"
            >
              Free Estimate
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-white md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))" }}
          >
            <span className="relative block h-5 w-6">
              <span
                className={`absolute left-0 top-1 h-0.5 w-6 bg-current transition-transform duration-300 ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2.5 h-0.5 w-6 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-4 h-0.5 w-6 bg-current transition-transform duration-300 ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile menu — dark frosted panel anchored to the floating bar */}
        <div
          className={`absolute inset-x-0 top-[calc(100%+10px)] origin-top overflow-hidden rounded-2xl transition-all duration-300 md:hidden ${
            open ? "visible opacity-100" : "invisible -translate-y-2 opacity-0"
          }`}
          style={{
            backgroundColor: "rgba(10,28,14,0.92)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
          }}
        >
          <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-fresh-light"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <a
                href={`tel:${primaryPhone.tel}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 font-bold text-white transition hover:bg-white/10"
              >
                <Icon name="phone" className="h-5 w-5" /> {primaryPhone.display}
              </a>
              <Link
                href="/#estimate"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 font-bold text-charcoal"
              >
                <Icon name="sparkle" className="h-5 w-5" /> Get a Free Estimate
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
