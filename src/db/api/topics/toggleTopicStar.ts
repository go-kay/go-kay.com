import db from '$db';
import { topicStars } from '$db/schema';
import type { NewTopicStar } from '$db/schema';
import { and, eq } from 'drizzle-orm';

export async function toggleTopicStar({ topicId, userId }: { topicId: string; userId: string }) {
	const result = await db
		.delete(topicStars)
		.where(and(eq(topicStars.topicId, topicId), eq(topicStars.userId, userId)));
	if (result.rowCount === 0) {
		const newTopicStar: NewTopicStar = {
			topicId,
			userId
		};
		await db.insert(topicStars).values(newTopicStar);
	}
}
