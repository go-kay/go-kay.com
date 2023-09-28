import { date, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	firstName: varchar('first_name', {
		length: 48
	}),
	lastName: varchar('last_name', {
		length: 48
	}),
	phone: varchar('phone', {
		length: 24
	}),
	birthday: date('birthday')
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
