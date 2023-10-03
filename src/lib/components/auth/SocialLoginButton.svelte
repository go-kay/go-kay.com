<script lang="ts">
	import type { Provider, SupabaseClient } from '@supabase/supabase-js';
	import Spinner from '$lib/components/spinner/Spinner.svelte';
	import { signInWithOAuth } from '$db/api';
	export let provider: Provider,
		loading: string | undefined = undefined,
		supabase: SupabaseClient;

	let isLoading = false;
	$: isLoading = loading == provider;
</script>

<button
	class="h-12 border-primary border p-2 rounded sm:hover:bg-primary-100 dark:sm:hover:bg-primary-800 transition-all relative w-full"
	disabled={loading !== undefined}
	on:click={() => {
		signInWithOAuth({ supabase, provider });
		loading = provider;
	}}
>
	{#if isLoading}
		<Spinner classes="w-6 h-6 border-primary absolute m-auto left-0 right-0 top-0 bottom-0" />
	{:else}
		<div>
			<i
				class="fa fa-{provider} text-primary absolute left-4 top-0 bottom-0 my-auto text-center h-fit"
			/>
			<span class="text-primary">
				Sign in with {provider}
			</span>
		</div>
	{/if}
</button>
