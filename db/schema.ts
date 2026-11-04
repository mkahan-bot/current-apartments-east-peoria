import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leasing_leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  leadId: text("lead_id").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull().default(""),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  interestedIn: text("interested_in").notNull().default(""),
  moveIn: text("move_in").notNull().default(""),
  message: text("message").notNull().default(""),
  source: text("source").notNull().default("Website"),
  status: text("status").notNull().default("New"),
  assignedTo: text("assigned_to").notNull().default("Jake"),
  notificationStatus: text("notification_status").notNull().default("Stored"),
  consentAt: text("consent_at").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

/**
 * "Ask Katie" questions from prospects who aren't ready to apply or tour.
 * Kept separate from leasing_leads so an LLM auto-responder and the AppFolio
 * Realm-X funnel can work this queue on its own (status / answer columns).
 */
export const prospectQuestions = sqliteTable("prospect_questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  inquiryId: text("inquiry_id").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  question: text("question").notNull(),
  pageUrl: text("page_url").notNull().default(""),
  referrer: text("referrer").notNull().default(""),
  utm: text("utm").notNull().default("{}"),
  source: text("source").notNull().default("Website - Ask Katie"),
  // New -> AutoAnswered / NeedsHuman -> Answered; funnelStage mirrors AppFolio guest-card stages.
  status: text("status").notNull().default("New"),
  funnelStage: text("funnel_stage").notNull().default("Inquiry"),
  answer: text("answer").notNull().default(""),
  appfolioProspectId: text("appfolio_prospect_id").notNull().default(""),
  notificationStatus: text("notification_status").notNull().default("Stored"),
  consentAt: text("consent_at").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
