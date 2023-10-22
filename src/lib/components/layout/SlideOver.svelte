<script lang="ts">
	import { fade } from 'svelte/transition';

	export let open: boolean, title: string, close: () => void, description: string;
</script>

<div
	class="fixed shadow-sm {open
		? 'right-0'
		: '-right-1/4'} top-0 flex flex-col h-full z-20 bg-background w-1/4 transition-all duration-500 ease-in-out"
>
	<div class="p-6 flex flex-col bg-primary">
		<div class="flex justify-between items-center">
			<p class="text-background">{title}</p>
			<button on:click={close}>
				<i class="fa fa-x text-background-300 text-sm" />
			</button>
		</div>
		<p class="text-background-300 mt-4 text-sm">
			{description}
		</p>
	</div>
	<div class="p-6">
		<slot name="contents" />
	</div>
	<div class="mt-auto border-t px-6 py-4 border-primary-200">
		<slot name="actions" />
	</div>
</div>

<slot name="actions" />
{#if open}
	<button
		transition:fade={{ duration: 200 }}
		class="fixed top-0 left-0 z-10 h-full w-full bg-black dark:bg-gray-600 dark:bg-opacity-10 bg-opacity-10 transition-all"
		on:click={close}
	/>
{/if}
