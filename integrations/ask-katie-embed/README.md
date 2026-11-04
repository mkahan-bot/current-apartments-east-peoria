# "Ask Katie" form

For prospects who aren't ready to apply or schedule a tour. Fields: first name, last name, email, optional phone, question, and a pre-checked "I agree to be contacted by a leasing agent" box (unchecking it opts out of sales follow-up; the question is still answered).

## Where it lives

- **This site:** `app/ask-katie-form.tsx`, rendered on the homepage at `#ask-katie` and linked from the footer.
- **Any other page:** paste `ask-katie-embed.html` (self-contained HTML/CSS/JS). It posts to `https://currentapartmentseastpeoria.com/api/questions` by default; that route allows cross-origin posts from thecurrent500.com and currentapartmentseastpeoria.com (with or without `www`).

## What happens on submit

1. `POST /api/questions` validates and stores the question in D1 (`prospect_questions`).
2. It forwards the structured payload to `QUESTION_WEBHOOK_URL` (falls back to `LEAD_WEBHOOK_URL`).
3. The Google Apps Script bridge sees `formType: "question"`, logs it to a **Questions** tab, and emails `jd@geula.ai` and `knewell@hapropertymanagement.com` with the prospect as Reply-To.

## Payload (`ask-katie.v1`)

```json
{
  "schemaVersion": "ask-katie.v1",
  "formType": "question",
  "inquiryId": "uuid",
  "submittedAt": "2026-11-03T21:30:00.000Z",
  "property": { "name": "The Current Apartments", "address": "500 Centennial Drive, East Peoria, IL 61611" },
  "contact": { "firstName": "", "lastName": "", "email": "", "phone": "" },
  "question": { "text": "" },
  "context": { "pageUrl": "", "referrer": "", "utm": { "utm_source": "" } },
  "routing": { "assignedTo": "Katie", "source": "Website - Ask Katie", "funnelStage": "Inquiry", "status": "New" },
  "consent": { "contact": true, "consentAt": "" }  // contact=false when the prospect unchecks the box
}
```

The `status`, `funnel_stage`, `answer` and `appfolio_prospect_id` columns in D1 are there for the next steps: an LLM drafts or sends an answer (status `AutoAnswered` or `NeedsHuman`), and the prospect is created as an AppFolio guest card through Realm-X. Pointing `QUESTION_WEBHOOK_URL` at an automation (n8n, Zapier, Make, or a small worker) is the cleanest hook for that.
