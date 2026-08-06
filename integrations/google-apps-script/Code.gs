const SPREADSHEET_ID = "1Cy8Fmi_ZehgAXZe9ROevoPr_sTjsgygHQen_sVAZy68";
const SHEET_NAME = "Leads";
const LEASING_EMAILS = [
  "jake@hapropertymanagement.com",
  "avromi@haproperties.co",
];

function doPost(event) {
  try {
    const lead = JSON.parse(event.postData.contents || "{}");
    const expectedSecret = PropertiesService.getScriptProperties().getProperty("LEAD_WEBHOOK_SECRET") || "";
    if (expectedSecret && lead.integrationSecret !== expectedSecret) {
      return jsonResponse({ ok: false, error: "Unauthorized" });
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

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
