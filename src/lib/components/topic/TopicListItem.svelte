<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from '$lib/components/toast/toast';
	import type { ActionResult } from '@sveltejs/kit';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import type { SubMenuTopicItem } from '$db/types/topics/SubMenuTopicItem';

	export let topic: SubMenuTopicItem;

	let currentPage = $page.params.name === topic.name;
	$: currentPage = $page.params.name === topic.name;

	const handleResult = ({ result }: { result: ActionResult }) => {
		if (result.type === 'success') {
			invalidateAll();
		} else if (result.type === 'failure') {
			toast({ type: 'error', description: result.data!.message as string });
		}
	};
</script>

<div
	class="flex items-center px-2 py-1 rounded sm:hover:bg-primary-100"
	class:bg-primary-100={currentPage}
>
	<div class="flex justify-center items-center w-5">
		<i class="{topic.icon} text-lg text-primary" />
	</div>
	<p class="text-primary text-sm ml-3">
		{topic.name}
		<span class="text-xs ml-2 text-primary-300">({topic.countPosts})</span>
	</p>

	<form action="/?/toggleStar" class="ml-auto" method="POST" use:enhance={() => handleResult}>
		<button name="topicId" value={topic.id} on:click|stopPropagation>
			<i class="{topic.favorite ? 'fa-solid' : 'fa-regular'} fa-star text-primary" />
		</button>
	</form>
</div>
