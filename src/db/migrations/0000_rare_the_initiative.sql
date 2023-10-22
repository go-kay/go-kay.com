CREATE TABLE IF NOT EXISTS "topics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(48) NOT NULL,
	"description" varchar(200),
	"icon" varchar(200),
	"creator_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"is_deleted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" varchar(48) NOT NULL,
	"last_name" varchar(48) NOT NULL,
	"email" varchar(80),
	"avatar_url" varchar(255),
	"gender" varchar NOT NULL,
	"phone" varchar(24) NOT NULL,
	"country" varchar(48) NOT NULL,
	"country_code" char(2) NOT NULL,
	"birthday" date NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"is_deleted" boolean DEFAULT false,
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
