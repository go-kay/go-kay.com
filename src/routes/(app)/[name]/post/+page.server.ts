import type { Actions } from '@sveltejs/kit';
import db from '$db';
import { postImages, posts } from '$db/schema';
import type { NewPostImage } from '$db/schema';
import type { NewPost } from '$db/schema';
import { fail } from '@sveltejs/kit';
import getUser from '$db/api/users/getUser';

export const actions: Actions = {
	post: async ({ params, request, locals: { getSession } }) => {
		const session = await getSession();
		const user = await getUser({ id: session.user.id });
		if (!user) {
			return fail(401, { message: 'Please sign in first' });
		}
		const topicName = params.name;
		if (!topicName) {
			return fail(400, { message: 'Wrong request!' });
		}
		const data = await request.formData();
		let title = data.get('title');
		if (!title) {
			return fail(400, { message: 'Please write title of the post' });
		}
		title = String(title);
		let contents = data.get('contents');
		contents = String(contents);
		if (!contents) {
			return fail(400, { message: 'Please write contents of the post' });
		}

		const topic = await db.query.topics.findFirst({
			where: (topics, { eq }) => eq(topics.name, topicName)
		});
		if (!topic) {
			return fail(400, { message: `Topic ${topicName} does not exists!` });
		}

		const newPost: NewPost = {
			title,
			contents,
			topicId: topic.id,
			authorId: user.id
		};
		const { id: post_id } = (await db.insert(posts).values(newPost).returning({ id: posts.id }))[0];

		const images = data.get('images');
		if (images) {
			const paths = (images as string).split(', ');
			for (let order = 0; order < paths.length; order++) {
				const path = paths[order];
				const newPostImage: NewPostImage = {
					post_id,
					path,
					order
				};
				await db.insert(postImages).values(newPostImage);
			}
		}
	}
};
