# Google Sheet and email bridge

This Apps Script receives website leads, appends them to **The Current Apartments — Leasing Lead Tracker**, and emails `jake@hapropertymanagement.com`.

1. Create a Google Apps Script project owned by the same Google account as the tracker.
2. Paste `Code.gs` into the project.
3. Optionally add a Script Property named `LEAD_WEBHOOK_SECRET` with a long random value.
4. Deploy as a Web app, executing as the owner and allowing access to anyone.
5. Add the deployment URL to the Site environment variable `LEAD_WEBHOOK_URL`.
6. If a secret was configured, add the same value to `LEAD_WEBHOOK_SECRET`.
7. Redeploy the approved Site version and submit one test lead.

Until this bridge is deployed, ChatGPT Sites still stores valid leads in its D1 database, but the email and Google Sheet notification step remains inactive.

## "Ask Katie" questions

The same script also handles the "Ask Katie" question form (`POST /api/questions`). Those submissions arrive with `formType: "question"`, are appended to a **Questions** tab (created on first use), and are emailed to `jd@geula.ai` with the prospect as Reply-To. The email ends with the full `ask-katie.v1` JSON payload so an LLM auto-responder can parse it.

- To change who receives questions, edit `QUESTION_EMAILS` in `Code.gs` and redeploy the web app.
- To send questions somewhere else (for example an n8n/Zapier/Make flow that calls an LLM and AppFolio), set `QUESTION_WEBHOOK_URL` (and optionally `QUESTION_WEBHOOK_SECRET`) on the Site. If unset, questions go to `LEAD_WEBHOOK_URL`.
- Valid questions are always stored in the D1 table `prospect_questions`, even before any webhook is set up.
