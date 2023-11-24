import type { LayoutServerLoad } from './$types';
import db from '$db';
import { posts, topics, topicStars, users } from '$db/schema';
import { and, eq, sql } from 'drizzle-orm';
import type { SubMenuTopicItem } from '$db/types/topics/SubMenuTopicItem';

export const load: LayoutServerLoad = async ({ locals: { getSession }, depends }) => {
	async function getUser() {
		const session = await getSession();
		if (session) {
			const selectUser = await db.select().from(users).where(eq(users.id, session.user.id));
			if (selectUser.length > 0) {
				return selectUser[0];
			}
		}
	}

	async function getTopics(): Promise<SubMenuTopicItem[]> {
		const user = await getUser();
		return await db
			.select({
				id: topics.id,
				name: topics.name,
				icon: topics.icon,
				favorite: sql<boolean>`count(${topicStars})>0`,
				countPosts: sql<number>`count(${posts})`
			})
			.from(topics)
			.leftJoin(
				topicStars,
				and(eq(topics.id, topicStars.topicId), eq(topicStars.userId, user ? user.id : 'NONE'))
			)
			.leftJoin(posts, eq(topics.id, posts.topicId))
			.groupBy(({ id }) => id);
	}

	depends('app:topics');

	return {
		user: await getUser(),
		topics: await getTopics()
	};
};
