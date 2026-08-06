# The Current Apartments — East Peoria

Production source for `https://currentapartmentseastpeoria.com/`.

## Hosting options

- **ChatGPT Sites:** primary deployment, with D1 lead storage and built-in traffic analytics.
- **Git-based hosting:** the same repository can deploy to a compatible Cloudflare Workers or Vercel runtime. The source is not locked to ChatGPT Sites.
- **GitHub Pages:** use the prepared Google Apps Script bridge as the public form backend when converting the project to a fully static export.

## Leasing form

Valid submissions are stored in D1. When `LEAD_WEBHOOK_URL` is configured, submissions are also sent to the Google Apps Script bridge, which appends to the leasing tracker and emails `jake@hapropertymanagement.com` and `avromi@haproperties.co`.

AppFolio fields are already included in the tracker so its prospect API or a future connector can be added without restructuring the form.

## Local commands

```bash
npm run dev
npm run test
npm run db:generate
```
