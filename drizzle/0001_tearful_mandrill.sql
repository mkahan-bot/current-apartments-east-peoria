CREATE TABLE `prospect_questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`inquiry_id` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`question` text NOT NULL,
	`page_url` text DEFAULT '' NOT NULL,
	`referrer` text DEFAULT '' NOT NULL,
	`utm` text DEFAULT '{}' NOT NULL,
	`source` text DEFAULT 'Website - Ask Katie' NOT NULL,
	`status` text DEFAULT 'New' NOT NULL,
	`funnel_stage` text DEFAULT 'Inquiry' NOT NULL,
	`answer` text DEFAULT '' NOT NULL,
	`appfolio_prospect_id` text DEFAULT '' NOT NULL,
	`notification_status` text DEFAULT 'Stored' NOT NULL,
	`consent_at` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `prospect_questions_inquiry_id_unique` ON `prospect_questions` (`inquiry_id`);