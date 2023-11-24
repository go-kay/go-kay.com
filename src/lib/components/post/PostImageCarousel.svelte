<script lang="ts">
	import type { Post } from '$db/schema';

	export let post: Post;

	let index = 0;

	const handleClickLeft = () => {
		index -= 1;
	};
	const handleClickRight = () => {
		index += 1;
	};
</script>

{#if post.images && post.images.length > 0}
	<div class="mt-4 w-full max-w-full flex aspect-square overflow-x-hidden relative">
		<div class="flex transition-transform" style="transform: translateX(-{index * 100}%) ">
			{#each post.images as image}
				<img src={image.path} alt="post" class="object-contain w-full rounded-lg" />
			{/each}
		</div>
		{#if index > 0}
			<button
				type="button"
				class="absolute top-0 bottom-0 my-auto left-2"
				on:click={handleClickLeft}
			>
				<i class="fa-solid fa-circle-chevron-left text-primary text-4xl opacity-70" />
			</button>
		{/if}

		{#if index < post.images.length - 1}
			<button
				type="button"
				class="absolute top-0 bottom-0 my-auto right-2"
				on:click={handleClickRight}
			>
				<i class="fa-solid fa-circle-chevron-right text-primary text-4xl opacity-70" />
			</button>
		{/if}
		<div
			class="bg-primary opacity-60 rounded-full absolute px-2 py-1 text-background text-sm right-2 top-2"
		>
			{index + 1} / {post.images.length}
		</div>
	</div>
{/if}
