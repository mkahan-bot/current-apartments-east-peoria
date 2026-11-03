import { eq } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { getDb } from "../../../db";
import { prospectQuestions } from "../../../db/schema";
import { ALLOWED_ORIGINS, QUESTION_SOURCE, SCHEMA_VERSION, type QuestionInput, type QuestionPayload, validateQuestion } from "../../../lib/ask-katie";

// Lets the embeddable snippet post here from thecurrent500.com while it is on a different host.
function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin") || "";
  if (!ALLOWED_ORIGINS.includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function reply(request: Request, body: unknown, status: number) {
  return Response.json(body, { status, headers: corsHeaders(request) });
}

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function POST(request: Request) {
  let input: QuestionInput;
  try {
    input = await request.json() as QuestionInput;
  } catch {
    return reply(request, { error: "We could not read your submission. Please try again." }, 400);
  }

  const result = validateQuestion(input);
  if (!result.ok) return reply(request, { error: result.error }, 400);
  // Quietly accept automated honeypot submissions without storing them.
  if (result.spam) return reply(request, { ok: true }, 201);

  const submittedAt = new Date().toISOString();
  const payload: QuestionPayload = {
    schemaVersion: SCHEMA_VERSION,
    formType: "question",
    inquiryId: crypto.randomUUID(),
    submittedAt,
    property: { name: "The Current Apartments", address: "500 Centennial Drive, East Peoria, IL 61611" },
    ...result.fields,
    routing: { assignedTo: "Katie", source: QUESTION_SOURCE, funnelStage: "Inquiry", status: "New" },
    consent: { contact: true, consentAt: submittedAt },
  };

  try {
    const db = getDb();
    await db.insert(prospectQuestions).values({
      inquiryId: payload.inquiryId,
      firstName: payload.contact.firstName,
      lastName: payload.contact.lastName,
      email: payload.contact.email,
      phone: payload.contact.phone,
      question: payload.question.text,
      pageUrl: payload.context.pageUrl,
      referrer: payload.context.referrer,
      utm: JSON.stringify(payload.context.utm),
      source: payload.routing.source,
      status: payload.routing.status,
      funnelStage: payload.routing.funnelStage,
      consentAt: payload.consent.consentAt,
    });

    const runtime = env as unknown as Record<string, string | undefined>;
    const webhookUrl = runtime.QUESTION_WEBHOOK_URL || runtime.LEAD_WEBHOOK_URL;
    let notificationStatus = "Stored";
    if (webhookUrl) {
      try {
        const webhook = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, integrationSecret: runtime.QUESTION_WEBHOOK_SECRET || runtime.LEAD_WEBHOOK_SECRET || "" }),
        });
        notificationStatus = webhook.ok ? "Delivered" : `Webhook ${webhook.status}`;
      } catch {
        notificationStatus = "Webhook Error";
      }
      await db.update(prospectQuestions).set({ notificationStatus }).where(eq(prospectQuestions.inquiryId, payload.inquiryId));
    }

    return reply(request, { ok: true, inquiryId: payload.inquiryId, notificationStatus }, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    return reply(request, {
      error: message.includes("no such table")
        ? "The question form is being set up. Please try again shortly or call 309-210-5904."
        : "We could not send your question. Please try again or call 309-210-5904.",
    }, 500);
  }
}
