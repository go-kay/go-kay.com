ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "phone" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "birthday" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "name" varchar(48) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" varchar(80);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "avatar_url" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "gender" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "country" varchar(48) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "country_code" char(2) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "first_name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "last_name";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_phone_unique" UNIQUE("phone");