import { NextResponse } from "next/server";

/**
 * Lead intake endpoint.
 *
 * This validates and acknowledges estimate requests. To deliver leads, wire one
 * of the integrations below (env-driven, no code changes elsewhere):
 *   - Resend / SendGrid email
 *   - A CRM webhook (set LEAD_WEBHOOK_URL)
 *   - A spreadsheet / database
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const service = String(body.service ?? "").trim();

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

  // Optional: forward to a CRM / automation webhook if configured.
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
  } else {
    console.info("New estimate request:", lead);
  }

  return NextResponse.json({ ok: true });
}
