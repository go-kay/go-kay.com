<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from '$lib/components/toast/toast';
	import Spinner from '$lib/components/spinner/Spinner.svelte';

	export let verified: boolean, phone: string, countryPhone: string;
	let code: string,
		loading = false;
	const handleSubmit: SubmitFunction = ({ cancel }) => {
		loading = true;
		if (!code) {
			cancel();
			return toast({
				type: 'error',
				description: 'Please enter code.'
			});
		}
		if (code.length !== 6) {
			cancel();
			return toast({
				type: 'error',
				description: 'Please enter valid code.'
			});
		}
		return async ({ result, update }) => {
			loading = false;
			if (result.type === 'success') {
				toast({
					description: result.data!.message
				});
				verified = true;
			} else if (result.type === 'failure') {
				toast({
					type: 'error',
					description: result.data!.message
				});
			}
			update({ reset: false });
		};
	};
</script>

<form action="?/verify" method="POST" use:enhance={handleSubmit}>
	<div class="flex space-x-4">
		<input
			disabled={verified}
			class="border rounded border-primary bg-background text-primary w-full px-4 py-2 placeholder-primary-400"
			type="text"
			bind:value={code}
			maxlength="6"
			placeholder="code"
			name="code"
		/>
		<button
			disabled={verified}
			type="submit"
			class="p-2 rounded min-w-[128px] w-32 {verified
				? 'bg-background border-primary border'
				: 'bg-primary sm:hover:bg-primary-500 text-background'} h-12"
		>
			{#if verified}
				<div class="flex items-center justify-center">
					<i class="fa fa-circle-check text-primary mr-2" />
					<span class="text-primary">Verified</span>
				</div>
			{:else if loading}
				<Spinner />
			{:else}
				Verify
			{/if}
		</button>
		<input type="text" name="phone" value={phone} class="hidden" />
		<input type="text" name="countryPhone" value={countryPhone} class="hidden" />
	</div>
</form>
