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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-soft backdrop-blur-md"
          : "bg-white/0"
      }`}
      style={{ height: "var(--header-h)" }}
    >
      <div className="container-x flex h-full items-center justify-between">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          {/* Full-color logo. When the header is transparent over the dark hero,
              sit it on a white pill so it stays readable; on scroll the header
              itself is white, so the logo sits on white directly. */}
          <span
            className={`inline-flex items-center rounded-xl transition-all duration-300 ${
              scrolled ? "" : "bg-white/92 px-3 py-1.5 shadow-soft backdrop-blur-sm"
            }`}
          >
            <Image
              src="/images/branding/logo-horizontal.png"
              alt={site.name}
              width={220}
              height={64}
              priority
              sizes="(max-width: 1024px) 160px, 220px"
              className="h-auto w-[160px] object-contain lg:w-[220px]"
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm font-semibold text-charcoal/80 transition hover:text-forest"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${primaryPhone.tel}`}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-forest transition hover:bg-forest/5"
          >
            <Icon name="phone" className="h-4 w-4" />
            {primaryPhone.display}
          </a>
          <Link
            href="/#estimate"
            className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-forest-dark hover:-translate-y-0.5"
          >
            Free Estimate
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-charcoal md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
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

      {/* Mobile menu */}
      <div
        className={`fixed inset-x-0 top-[var(--header-h)] z-40 origin-top bg-white shadow-lift transition-all duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav className="container-x flex flex-col gap-1 py-4" aria-label="Mobile">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-semibold text-charcoal transition hover:bg-cream"
            >
              {n.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            <a
              href={`tel:${primaryPhone.tel}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-forest px-5 py-3 font-bold text-forest"
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
    </header>
  );
}
