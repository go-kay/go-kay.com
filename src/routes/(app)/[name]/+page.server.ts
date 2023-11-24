import type { PageServerLoad } from './$types';
import db from '$db';
import { redirect } from '@sveltejs/kit';
import type { Post } from '$db/schema';
export const load: PageServerLoad = async ({ params }) => {
	const topic = await db.query.topics.findFirst({
		where: (t, { eq }) => eq(t.name, params.name)
	});
	if (!topic) {
		throw redirect(301, '/');
	}
	const posts: Post[] = await db.query.posts.findMany({
		where: (p, { eq }) => eq(p.topicId, topic.id),
		with: {
			author: true,
			images: {
				orderBy: (image, { asc }) => [asc(image.order)]
			}
		},
		orderBy: (p, { desc }) => [desc(p.createdAt)]
	});

	return {
		posts
	};
};
