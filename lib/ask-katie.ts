/**
 * Shared shape for "Ask Katie" prospect questions.
 *
 * The same JSON goes to the D1 row, the notification webhook (Google Apps
 * Script -> email to jd@geula.ai), and later an LLM auto-responder and the
 * AppFolio Realm-X guest-card funnel. Bump SCHEMA_VERSION if fields change.
 */
export const SCHEMA_VERSION = "ask-katie.v1";
export const QUESTION_SOURCE = "Website - Ask Katie";

export const ALLOWED_ORIGINS = [
  "https://thecurrent500.com",
  "https://www.thecurrent500.com",
  "https://currentapartmentseastpeoria.com",
  "https://www.currentapartmentseastpeoria.com",
];

export type QuestionInput = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  question?: unknown;
  consent?: unknown;
  pageUrl?: unknown;
  referrer?: unknown;
  utm?: unknown;
  website?: unknown; // honeypot
};

export type QuestionPayload = {
  schemaVersion: typeof SCHEMA_VERSION;
  formType: "question";
  inquiryId: string;
  submittedAt: string;
  property: { name: string; address: string };
  contact: { firstName: string; lastName: string; email: string; phone: string };
  question: { text: string };
  context: { pageUrl: string; referrer: string; utm: Record<string, string> };
  routing: { assignedTo: string; source: string; funnelStage: string; status: string };
  // contact=false means the prospect unchecked the pre-checked box: answer the question, but no sales follow-up.
  consent: { contact: boolean; consentAt: string };
};

export function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];

export function cleanUtm(value: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!value || typeof value !== "object") return out;
  for (const key of UTM_KEYS) {
    const v = clean((value as Record<string, unknown>)[key], 200);
    if (v) out[key] = v;
  }
  return out;
}

export type ValidationResult =
  | { ok: true; spam: false; contactConsent: boolean; fields: Omit<QuestionPayload, "inquiryId" | "submittedAt" | "consent" | "schemaVersion" | "formType" | "property" | "routing"> }
  | { ok: true; spam: true }
  | { ok: false; error: string };

export function validateQuestion(input: QuestionInput): ValidationResult {
  if (clean(input.website, 120)) return { ok: true, spam: true };

  const firstName = clean(input.firstName, 80);
  const lastName = clean(input.lastName, 80);
  const email = clean(input.email, 180).toLowerCase();
  const phone = clean(input.phone, 40);
  const question = clean(input.question, 2000);

  if (!firstName || !lastName) return { ok: false, error: "Please share your first and last name." };
  if (!validEmail(email)) return { ok: false, error: "Please enter a valid email address so Katie can reply." };
  if (phone && phone.replace(/\D/g, "").length < 10) return { ok: false, error: "Please check your phone number, or leave it blank." };
  if (question.length < 3) return { ok: false, error: "Please type your question." };

  return {
    ok: true,
    spam: false,
    contactConsent: clean(input.consent, 10) === "yes",
    fields: {
      contact: { firstName, lastName, email, phone },
      question: { text: question },
      context: { pageUrl: clean(input.pageUrl, 500), referrer: clean(input.referrer, 500), utm: cleanUtm(input.utm) },
    },
  };
}
