import Link from "next/link";
import { CallButton } from "@/components/Buttons";
import { Footer } from "@/components/sections/Footer";

export default function NotFound() {
  return (
    <>
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-forest-darker pt-[var(--header-h)] text-white">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(120% 100% at 20% 0%, #1b5e20 0%, #103d16 50%, #0a2c10 100%)",
          }}
          aria-hidden="true"
        />
        <div className="container-x py-20 text-center">
          <p className="eyebrow text-fresh-light">404</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            This page took a detour through the garden.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-white/75">
            The page you&apos;re looking for doesn&apos;t exist — but our crews are still here to help.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-display font-bold text-forest transition hover:bg-cream"
            >
              ← Back home
            </Link>
            <CallButton size="lg" />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
