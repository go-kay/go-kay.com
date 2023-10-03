<script lang="ts">
	import { enhance } from '$app/forms';
	import Spinner from '$lib/components/spinner/Spinner.svelte';

	export let loading: string | undefined;
	let isLoading = false;

	$: isLoading = loading === 'email';
</script>

<form
	action="?/email"
	method="POST"
	use:enhance={() =>
		async ({ update }) => {
			await update();
			loading = undefined;
		}}
	class="w-full"
	on:submit={() => (loading = 'email')}
>
	<input
		name="email"
		type="email"
		placeholder="Enter your email"
		class="w-full h-12 border border-primary placeholder-primary text-primary"
	/>
	<button
		type="submit"
		disabled={loading !== undefined}
		class="mt-2 p-2 bg-primary w-full h-12 rounded sm:hover:bg-primary-600 dark:sm:hover:bg-primary-400 transition-all relative"
	>
		{#if isLoading}
			<Spinner classes="w-6 h-6 border-background absolute m-auto left-0 right-0 top-0 bottom-0" />
		{:else}
			<div>
				<i
					class="fa-solid fa-envelope text-background absolute left-4 top-0 bottom-0 my-auto text-center h-fit"
				/>
				<span class="text-background m-auto absolute left-0 right-0 top-0 bottom-0 h-fit">
					Sign in with email
				</span>
			</div>
		{/if}
	</button>
</form>
