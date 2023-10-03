ALTER TABLE "users" RENAME COLUMN "name" TO "first_name";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" varchar(48) NOT NULL;