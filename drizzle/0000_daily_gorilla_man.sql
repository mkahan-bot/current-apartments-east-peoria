CREATE TABLE `leasing_leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`lead_id` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text DEFAULT '' NOT NULL,
	`email` text NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`interested_in` text DEFAULT '' NOT NULL,
	`move_in` text DEFAULT '' NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`source` text DEFAULT 'Website' NOT NULL,
	`status` text DEFAULT 'New' NOT NULL,
	`assigned_to` text DEFAULT 'Jake' NOT NULL,
	`notification_status` text DEFAULT 'Stored' NOT NULL,
	`consent_at` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `leasing_leads_lead_id_unique` ON `leasing_leads` (`lead_id`);