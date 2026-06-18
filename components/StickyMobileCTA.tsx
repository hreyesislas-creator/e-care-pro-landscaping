import Link from "next/link";
import { Icon } from "@/components/Icon";
import { primaryPhone } from "@/lib/site";

/** Sticky click-to-call + quote bar, mobile only. */
export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-white/95 backdrop-blur-md md:hidden">
      <div
        className="grid grid-cols-2 gap-2 p-2.5"
        style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
      >
        <a
          href={`tel:${primaryPhone.tel}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-forest py-3.5 font-display font-bold text-white"
          aria-label={`Call ${primaryPhone.display}`}
        >
          <Icon name="phone" className="h-5 w-5" /> Call Now
        </a>
        <Link
          href="/#estimate"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gold py-3.5 font-display font-bold text-charcoal"
        >
          <Icon name="sparkle" className="h-5 w-5" /> Free Quote
        </Link>
      </div>
    </div>
  );
}
