<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from '$lib/components/toast/toast';
	import type { CountryCode } from '$lib/assets/CountryCodes';
	import Spinner from '$lib/components/spinner/Spinner.svelte';

	export let country: CountryCode | string, verificationCodeSent: boolean, phone: string;
	let loading = false;

	const handleSubmit: SubmitFunction = async () => {
		loading = true;
		return async ({ update, result }) => {
			loading = false;
			if (result.type === 'failure') {
				return toast({
					type: 'error',
					description: result.data!.message
				});
			}
			if (result.type === 'success') {
				toast({
					description: result.data!.message
				});
				verificationCodeSent = true;
			}
			update({ reset: false });
		};
	};
</script>

<form action="?/sendVerifySms" method="POST" use:enhance={handleSubmit}>
	<button
		type="submit"
		class="p-2 rounded bg-primary text-background sm:hover:bg-primary-500 h-12 relative w-32"
	>
		{#if verificationCodeSent}
			Resend
		{:else if loading}
			<Spinner />
		{:else}
			Verify
		{/if}
	</button>
	<input type="text" value={phone} name="phone" class="hidden" />
	<input
		type="text"
		value={!country || typeof country === 'string' ? undefined : country.phone[0]}
		name="countryPhone"
		class="hidden"
	/>
</form>
