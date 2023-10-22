<script lang="ts">
	import { toggleCreateTopicSlideOver } from '$store/home';
	import { primaryButton } from '$style/button/primaryButton';
	import type { User } from '$db/schema';
	import { toast } from '$lib/components/toast/toast';

	export let user: User;

	const handleClickCreateTopicButton = () => {
		if (!user) {
			return toast({
				type: 'error',
				description: 'Please sign-in to create a topic'
			});
		}
		toggleCreateTopicSlideOver();
	};
</script>

<div class="flex flex-col border-r p-2 w-52 bg-background border-secondary justify-between">
	<div class="bg-secondary flex rounded items-center w-full px-3 py-1">
		<i class="fa fa-search text-secondary-300" />
		<input
			type="text"
			name="search"
			placeholder="search topic"
			class="h-8 bg-secondary border-none !w-full text-sm text-primary outline-none px-2"
		/>
	</div>
	<div class="flex flex-col">
		<div class="border-t border-secondary mt-auto mb-3" />
		<button on:click={handleClickCreateTopicButton} class="{primaryButton} mb-1">
			Create a topic
		</button>
	</div>
</div>
