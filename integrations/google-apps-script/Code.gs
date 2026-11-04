const SPREADSHEET_ID = "1Cy8Fmi_ZehgAXZe9ROevoPr_sTjsgygHQen_sVAZy68";
const SHEET_NAME = "Leads";
const LEASING_EMAILS = [
  "jake@hapropertymanagement.com",
  "avromi@haproperties.co",
];
// "Ask Katie" questions (formType "question") go here instead of the leasing list.
const QUESTIONS_SHEET_NAME = "Questions";
const QUESTION_EMAILS = [
  "jd@geula.ai",
  "knewell@hapropertymanagement.com",
];

function doPost(event) {
  try {
    const lead = JSON.parse(event.postData.contents || "{}");
    const expectedSecret = PropertiesService.getScriptProperties().getProperty("LEAD_WEBHOOK_SECRET") || "";
    if (expectedSecret && lead.integrationSecret !== expectedSecret) {
      return jsonResponse({ ok: false, error: "Unauthorized" });
    }

    if (lead.formType === "question") {
      return handleQuestion(lead);
    }

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error("Leads sheet not found");

    sheet.appendRow([
      lead.submittedAt || new Date().toISOString(),
      lead.leadId || "",
      lead.firstName || "",
      lead.lastName || "",
      lead.email || "",
      lead.phone || "",
      lead.interestedIn || "",
      lead.moveIn || "",
      lead.message || "",
      lead.source || "Website",
      lead.status || "New",
      lead.assignedTo || "Jake",
      "",
      "",
      "",
      "Not Connected",
      lead.consentAt || "",
      "",
    ]);

    const name = [lead.firstName, lead.lastName].filter(Boolean).join(" ");
    const subject = `New leasing lead — ${name || lead.email}`;
    const body = [
      "A new prospect joined The Current Apartments interest list.",
      "",
      `Name: ${name}`,
      `Email: ${lead.email || ""}`,
      `Phone: ${lead.phone || ""}`,
      `Interested in: ${lead.interestedIn || "Not specified"}`,
      `Target move-in: ${lead.moveIn || "Not specified"}`,
      `Message: ${lead.message || "None"}`,
      `Lead ID: ${lead.leadId || ""}`,
    ].join("\n");

    MailApp.sendEmail({
      to: LEASING_EMAILS.join(","),
      subject: subject,
      body: body,
      replyTo: lead.email || LEASING_EMAILS[0],
    });
    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function handleQuestion(inquiry) {
  const contact = inquiry.contact || {};
  const context = inquiry.context || {};
  const question = (inquiry.question && inquiry.question.text) || "";
  const name = [contact.firstName, contact.lastName].filter(Boolean).join(" ");

  const book = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = book.getSheetByName(QUESTIONS_SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(QUESTIONS_SHEET_NAME);
    sheet.appendRow(["Submitted At", "Inquiry ID", "First Name", "Last Name", "Email", "Phone", "Question", "Page", "UTM", "Status", "Funnel Stage", "Answer", "AppFolio Prospect ID", "Raw JSON"]);
  }
  sheet.appendRow([
    inquiry.submittedAt || new Date().toISOString(),
    inquiry.inquiryId || "",
    contact.firstName || "",
    contact.lastName || "",
    contact.email || "",
    contact.phone || "",
    question,
    context.pageUrl || "",
    JSON.stringify(context.utm || {}),
    "New",
    "Inquiry",
    "",
    "",
    JSON.stringify(Object.assign({}, inquiry, { integrationSecret: undefined })),
  ]);

  const body = [
    "A prospect sent a question through \"Ask Katie\" on The Current Apartments website.",
    "Reply to this email to answer them directly.",
    "",
    `Name: ${name}`,
    `Email: ${contact.email || ""}`,
    `Phone: ${contact.phone || "Not provided"}`,
    `OK to contact about leasing: ${inquiry.consent && inquiry.consent.contact === false ? "NO (opted out, answer the question only)" : "Yes"}`,
    "",
    "Question:",
    question,
    "",
    `Page: ${context.pageUrl || ""}`,
    `Inquiry ID: ${inquiry.inquiryId || ""}`,
    "",
    "--- structured payload (ask-katie.v1) ---",
    JSON.stringify(Object.assign({}, inquiry, { integrationSecret: undefined }), null, 2),
  ].join("\n");

  MailApp.sendEmail({
    to: QUESTION_EMAILS.join(","),
    subject: `Ask Katie — question from ${name || contact.email}`,
    body: body,
    replyTo: contact.email || QUESTION_EMAILS[0],
  });
  return jsonResponse({ ok: true });
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
