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
