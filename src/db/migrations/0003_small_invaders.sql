CREATE TABLE IF NOT EXISTS "sms_verification_codes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"code" char(6) NOT NULL,
	"expire_at" date NOT NULL,
	CONSTRAINT "sms_verification_codes_user_id_unique" UNIQUE("user_id")
);
