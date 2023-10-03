import { boolean, char, date, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: uuid('id').primaryKey(),
	firstName: varchar('first_name', {
		length: 48
	}).notNull(),
	lastName: varchar('last_name', {
		length: 48
	}).notNull(),
	email: varchar('email', {
		length: 80
	}),
	avatarUrl: varchar('avatar_url', {
		length: 255
	}),
	gender: varchar('gender').notNull(),
	phone: varchar('phone', {
		length: 24
	})
		.unique()
		.notNull(),
	country: varchar('country', {
		length: 48
	}).notNull(),
	countryCode: char('country_code', {
		length: 2
	}).notNull(),
	birthday: date('birthday').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at'),
	isDeleted: boolean('is_deleted').default(false)
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
