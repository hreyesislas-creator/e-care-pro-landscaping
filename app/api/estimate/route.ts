import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

/**
 * Lead intake endpoint for the "Free Estimate" form.
 *
 * Delivery: every valid estimate request is emailed to the business via Resend
 * (https://resend.com). Configure these environment variables:
 *
 *   RESEND_API_KEY   (required to send email)  — your Resend API key
 *   LEAD_TO_EMAIL    (optional)  — recipient; defaults to site.email
 *   LEAD_FROM_EMAIL  (optional)  — verified sender; defaults to onboarding@resend.dev
 *   LEAD_WEBHOOK_URL (optional)  — also forward the raw lead to a CRM / automation
 *
 * If RESEND_API_KEY is not set, the lead is still validated, logged server-side,
 * and forwarded to LEAD_WEBHOOK_URL (if configured) so nothing is silently lost.
 */

const TO_EMAIL = process.env.LEAD_TO_EMAIL ?? site.email;
const FROM_EMAIL =
  process.env.LEAD_FROM_EMAIL ?? "E-Care Pro Landscaping <onboarding@resend.dev>";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot — silently accept bot submissions without sending anything.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const service = String(body.service ?? "").trim();

  // Validate required fields.
  if (!name || !phone || !service) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 422 }
    );
  }

  const lead = {
    name,
    phone,
    email: String(body.email ?? "").trim(),
    service,
    city: String(body.city ?? "").trim(),
    message: String(body.message ?? "").trim(),
    receivedAt: new Date().toISOString(),
  };

  const submittedAt = new Date(lead.receivedAt).toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "full",
    timeStyle: "short",
  });

  const subject = "New Estimate Request - E-Care Pro Landscaping";

  const lines = [
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email || "—"}`,
    `Service: ${lead.service}`,
    `City: ${lead.city || "—"}`,
    `Message: ${lead.message || "—"}`,
    `Date Submitted: ${submittedAt}`,
  ];
  const text = lines.join("\n");
  const html = `<div style="font-family:system-ui,Arial,sans-serif;font-size:15px;color:#1a1a1a;line-height:1.6">
  <h2 style="margin:0 0 12px">New Estimate Request</h2>
  <table style="border-collapse:collapse">
    <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:600">Name</td><td>${escapeHtml(lead.name)}</td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:600">Phone</td><td><a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a></td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:600">Email</td><td>${lead.email ? `<a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a>` : "—"}</td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:600">Service</td><td>${escapeHtml(lead.service)}</td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:600">City</td><td>${escapeHtml(lead.city) || "—"}</td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:600;vertical-align:top">Message</td><td>${escapeHtml(lead.message) || "—"}</td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#555;font-weight:600">Date Submitted</td><td>${escapeHtml(submittedAt)}</td></tr>
  </table>
</div>`;

  // Always keep a server-side record of the lead.
  console.info("New estimate request:", lead);

  // Primary delivery: email the business via Resend.
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        subject,
        text,
        html,
        // Reply goes straight to the customer when they provided an email.
        ...(lead.email ? { replyTo: lead.email } : {}),
      });
      if (error) {
        console.error("Resend email failed:", error);
        return NextResponse.json(
          { ok: false, error: "Email delivery failed" },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("Resend email threw:", err);
      return NextResponse.json(
        { ok: false, error: "Email delivery failed" },
        { status: 502 }
      );
    }
  } else {
    console.warn(
      "RESEND_API_KEY is not set — estimate request was logged but NOT emailed."
    );
  }

  // Optional: also forward the raw lead to a CRM / automation webhook.
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch {
      // Don't fail the user's submission if the webhook is down.
      console.error("Lead webhook failed");
    }
  }

  return NextResponse.json({ ok: true });
}

/** Minimal HTML escaping for values interpolated into the email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
