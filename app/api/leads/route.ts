import { eq } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { getDb } from "../../../db";
import { leads } from "../../../db/schema";

type LeadPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  interestedIn?: string;
  moveIn?: string;
  message?: string;
  consent?: string;
  website?: string;
};

function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const payload = await request.json() as LeadPayload;

    // Quietly accept automated honeypot submissions without storing them.
    if (clean(payload.website, 120)) {
      return Response.json({ ok: true }, { status: 201 });
    }

    const firstName = clean(payload.firstName, 80);
    const lastName = clean(payload.lastName, 80);
    const email = clean(payload.email, 180).toLowerCase();
    const phone = clean(payload.phone, 60);
    const interestedIn = clean(payload.interestedIn, 160);
    const moveIn = clean(payload.moveIn, 100);
    const message = clean(payload.message, 1500);
    const consent = clean(payload.consent, 10);

    if (!firstName || !validEmail(email)) {
      return Response.json({ error: "Please provide your name and a valid email address." }, { status: 400 });
    }
    if (consent !== "yes") {
      return Response.json({ error: "Please confirm that we may contact you about leasing." }, { status: 400 });
    }

    const leadId = crypto.randomUUID();
    const consentAt = new Date().toISOString();
    const db = getDb();
    await db.insert(leads).values({
      leadId, firstName, lastName, email, phone, interestedIn, moveIn, message,
      source: "Website", status: "New", assignedTo: "Jake", consentAt,
    });

    const runtime = env as unknown as Record<string, string | undefined>;
    const webhookUrl = runtime.LEAD_WEBHOOK_URL;
    let notificationStatus = "Stored";

    if (webhookUrl) {
      try {
        const webhook = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leadId, submittedAt: consentAt, firstName, lastName, email, phone,
            interestedIn, moveIn, message, source: "Website", status: "New",
            assignedTo: "Jake", consentAt,
            integrationSecret: runtime.LEAD_WEBHOOK_SECRET || "",
          }),
        });
        notificationStatus = webhook.ok ? "Delivered" : `Webhook ${webhook.status}`;
      } catch {
        notificationStatus = "Webhook Error";
      }
      await db.update(leads).set({ notificationStatus }).where(eq(leads.leadId, leadId));
    }

    return Response.json({ ok: true, leadId, notificationStatus }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return Response.json({ error: message.includes("no such table") ? "The leasing form is being initialized. Please try again shortly." : "We could not save your request. Please try again or email the leasing team." }, { status: 500 });
  }
}
