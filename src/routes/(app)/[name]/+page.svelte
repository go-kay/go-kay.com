<script lang="ts">
	import type { PageData } from './$types';
	import AuthorInfo from '$lib/components/post/AuthorInfo.svelte';
	import moment from 'moment';
	import { primaryButton } from '$style/button/primaryButton';
	import PostImageCarousel from '$lib/components/post/PostImageCarousel.svelte';
	export let data: PageData;

	let { posts, topic } = data;
	$: ({ posts, topic } = data);
</script>

<div class="py-4 max-w-2xl mx-auto border-b mb-4 border-primary-200">
	<div class="flex items-center text-primary h-12">
		<i class="{topic.icon} text-2xl text-primary mr-4" />
		<p class="text-primary text-2xl">{topic.name}</p>
		<a href="{topic.name}/post" class="ml-auto {primaryButton}">
			<i class="fa fa-pen-to-square text-background mr-2" /> POST
		</a>
	</div>
</div>

<div class="flex flex-col space-y-4">
	{#each posts as post}
		{#if post.author}
			<div class="flex flex-col rounded bg-primary-100 p-6">
				<div class="flex items-center space-x-4">
					<AuthorInfo user={post.author} />
					<p class="text-primary-400">•</p>
					<p class="text-primary-400 text-xs">{moment(post.createdAt).fromNow()}</p>
				</div>
				<p class="mt-4 text-2xl text-primary font-semibold">{post.title}</p>
				<PostImageCarousel {post} />
				<p class="mt-4 text-base text-primary whitespace-pre-line">{post.contents}</p>
			</div>
		{/if}
	{/each}
</div>
