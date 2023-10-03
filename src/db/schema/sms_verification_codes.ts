import { char, pgTable, serial, timestamp, uuid } from 'drizzle-orm/pg-core';

export const smsVerificationCodes = pgTable('sms_verification_codes', {
	id: serial('id').primaryKey(),
	userId: uuid('user_id').notNull().unique(),
	code: char('code', { length: 6 }).notNull(),
	expireAt: timestamp('expire_at').notNull()
});

export type SmsVerificationCode = typeof smsVerificationCodes.$inferSelect;
export type NewSmsVerificationCode = typeof smsVerificationCodes.$inferInsert;
