CREATE TABLE IF NOT EXISTS "topic_stars" (
	"topic_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT topic_stars_topic_id_user_id PRIMARY KEY("topic_id","user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "topic_stars" ADD CONSTRAINT "topic_stars_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "topic_stars" ADD CONSTRAINT "topic_stars_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
