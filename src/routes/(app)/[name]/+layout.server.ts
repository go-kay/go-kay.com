import db from '$db';
import { topics } from '$db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ params }) => {
	const name = params.name;
	const selectTopic = await db.select().from(topics).where(eq(topics.name, name));
	if (selectTopic.length === 0) {
		throw redirect(301, '/?error=topic-not-found');
	}
	const topic = selectTopic[0];
	return {
		topic
	};
};
