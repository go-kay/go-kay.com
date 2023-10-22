import {
	boolean,
	char,
	date,
	pgTable,
	timestamp,
	uuid,
	varchar,
	integer
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

/*
	users table
 */
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
	deleted: boolean('is_deleted').default(false)
});

export const usersRelations = relations(users, ({ many }) => ({
	createdTopics: many(topics)
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

/*
	topics table
 */
export const topics = pgTable('topics', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', {
		length: 48
	}).notNull(),
	description: varchar('description', {
		length: 200
	}),
	icon: varchar('icon', { length: 200 }),
	creatorId: uuid('creator_id'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at'),
	deleted: boolean('is_deleted').default(false)
});

export const topicsRelations = relations(topics, ({ one }) => ({
	creator: one(users, {
		fields: [topics.creatorId],
		references: [users.id]
	})
}));

export type Topics = typeof topics.$inferSelect;
export type NewTopic = typeof topics.$inferInsert;
