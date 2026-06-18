"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { services, cities } from "@/lib/data";
import { primaryPhone } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

export function EstimateForm({
  compact = false,
  defaultService,
  defaultCity,
}: {
  compact?: boolean;
  defaultService?: string;
  defaultCity?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.company) return; // honeypot tripped
    setStatus("submitting");
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center shadow-card">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-fresh/15 text-fresh">
          <Icon name="check" className="h-9 w-9" strokeWidth={2.5} />
        </div>
        <h3 className="font-display text-2xl font-extrabold text-charcoal">Request received!</h3>
        <p className="max-w-sm text-charcoal-light">
          Thanks for reaching out to E-Care Pro Landscaping. We&apos;ll call you back shortly with your
          free estimate. Need us sooner?
        </p>
        <a
          href={`tel:${primaryPhone.tel}`}
          className="inline-flex items-center gap-2 font-display font-bold text-forest underline-offset-4 hover:underline"
        >
          <Icon name="phone" className="h-5 w-5" /> Call {primaryPhone.display}
        </a>
      </div>
    );
  }

  const fieldCls =
    "w-full rounded-xl border border-black/10 bg-cream/60 px-4 py-3 text-charcoal placeholder:text-charcoal/45 transition focus:border-fresh focus:bg-white";

  return (
    <form
      onSubmit={onSubmit}
      className={`rounded-3xl bg-white shadow-card ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"}`}
      noValidate
    >
      <div className="mb-4">
        <p className="eyebrow text-fresh">Free Estimate</p>
        <h3 className="mt-1 font-display text-xl font-extrabold text-charcoal sm:text-2xl">
          Get your free quote today
        </h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Full name</span>
          <input name="name" required autoComplete="name" placeholder="Full name *" className={fieldCls} />
        </label>
        <label className="block">
          <span className="sr-only">Phone number</span>
          <input
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            placeholder="Phone number *"
            className={fieldCls}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="sr-only">Email address</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            className={fieldCls}
          />
        </label>
        <label className="block">
          <span className="sr-only">Service needed</span>
          <select name="service" defaultValue={defaultService ?? ""} className={fieldCls} required>
            <option value="" disabled>
              Service needed *
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Other">Other / Not sure</option>
          </select>
        </label>
        <label className="block">
          <span className="sr-only">Your city</span>
          <select name="city" defaultValue={defaultCity ?? ""} className={fieldCls}>
            <option value="" disabled>
              Your city
            </option>
            {cities
              .filter((c) => !c.isCounty)
              .map((c) => (
                <option key={c.slug} value={c.name}>
                  {c.name}
                </option>
              ))}
            <option value="Other">Other</option>
          </select>
        </label>
        {!compact && (
          <label className="block sm:col-span-2">
            <span className="sr-only">Project details</span>
            <textarea
              name="message"
              rows={3}
              placeholder="Tell us about your project (optional)"
              className={fieldCls}
            />
          </label>
        )}
        {/* Honeypot */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 font-display text-base font-bold tracking-tight text-charcoal shadow-soft transition hover:bg-gold-light hover:-translate-y-0.5 disabled:opacity-70"
      >
        {status === "submitting" ? "Sending…" : "Request My Free Estimate"}
        {status !== "submitting" && <Icon name="sparkle" className="h-5 w-5" />}
      </button>

      {status === "error" && (
        <p className="mt-3 text-center text-sm text-red-600">
          Something went wrong. Please call us at{" "}
          <a href={`tel:${primaryPhone.tel}`} className="font-bold underline">
            {primaryPhone.display}
          </a>
          .
        </p>
      )}

      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-charcoal/55">
        <Icon name="shield" className="h-4 w-4 text-fresh" />
        No spam. No obligation. Licensed &amp; insured.
      </p>
    </form>
  );
}
