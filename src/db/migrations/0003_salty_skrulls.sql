CREATE TABLE IF NOT EXISTS "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"topic_id" uuid NOT NULL,
	"author_id" uuid NOT NULL,
	"contents" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "topics" RENAME COLUMN "is_deleted" TO "deleted";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "is_deleted" TO "deleted";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "topics" ADD CONSTRAINT "topics_name_unique" UNIQUE("name");