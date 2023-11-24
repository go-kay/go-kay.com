import {
	boolean,
	char,
	date,
	pgTable,
	timestamp,
	uuid,
	varchar,
	primaryKey,
	index,
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
	deleted: boolean('deleted').default(false)
});

export const usersRelations = relations(users, ({ many }) => ({
	createdTopics: many(topics),
	posts: many(posts)
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

/*
	topics table
 */
export const topics = pgTable(
	'topics',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		name: varchar('name', {
			length: 48
		})
			.unique()
			.notNull(),
		description: varchar('description', {
			length: 200
		}),
		icon: varchar('icon', { length: 200 }).notNull(),
		creatorId: uuid('creator_id').references(() => users.id, { onDelete: 'restrict' }),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at'),
		deleted: boolean('deleted').default(false)
	},
	(table) => {
		return {
			nameIdx: index('name_idx').on(table.name)
		};
	}
);

export const topicsRelations = relations(topics, ({ one, many }) => ({
	creator: one(users, { fields: [topics.creatorId], references: [users.id] }),
	stars: many(topicStars),
	posts: many(posts)
}));

export type Topic = typeof topics.$inferSelect & {
	stars?: TopicStar[];
};
export type NewTopic = typeof topics.$inferInsert;

export const topicStars = pgTable(
	'topic_stars',
	{
		topicId: uuid('topic_id')
			.notNull()
			.references(() => topics.id, { onDelete: 'cascade' }),
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		createdAt: timestamp('created_at').defaultNow()
	},
	(table) => {
		return {
			pk: primaryKey(table.topicId, table.userId)
		};
	}
);

export const topicStarsRelations = relations(topicStars, ({ one }) => ({
	topic: one(topics, {
		fields: [topicStars.topicId],
		references: [topics.id]
	})
}));

export type TopicStar = typeof topicStars.$inferSelect;
export type NewTopicStar = typeof topicStars.$inferInsert;

export const posts = pgTable('posts', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: varchar('title').notNull(),
	topicId: uuid('topic_id')
		.notNull()
		.references(() => topics.id, { onDelete: 'restrict' }),
	authorId: uuid('author_id')
		.notNull()
		.references(() => users.id, { onDelete: 'restrict' }),
	contents: varchar('contents').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at'),
	deleted: boolean('deleted').default(false)
});

export const postsRelations = relations(posts, ({ one, many }) => ({
	topic: one(topics, {
		fields: [posts.topicId],
		references: [topics.id]
	}),
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id]
	}),
	images: many(postImages)
}));

export type Post = typeof posts.$inferSelect & { author?: User; images?: PostImage[] };
export type NewPost = typeof posts.$inferInsert;

export const postImages = pgTable('post_images', {
	id: uuid('id').primaryKey().defaultRandom(),
	post_id: uuid('post_id')
		.notNull()
		.references(() => posts.id, { onDelete: 'cascade' }),
	path: varchar('path', { length: 255 }).notNull(),
	order: integer('order').notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export type PostImage = typeof postImages.$inferSelect;
export type NewPostImage = typeof postImages.$inferInsert;

export const postImageRelations = relations(postImages, ({ one }) => ({
	post: one(posts, { fields: [postImages.post_id], references: [posts.id] })
}));
