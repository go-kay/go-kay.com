CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(48),
	"last_name" varchar(48),
	"phone" varchar(24),
	"birthday" date
);
