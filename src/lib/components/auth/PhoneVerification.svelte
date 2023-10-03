<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from '$lib/components/toast/toast';

	export let verified: boolean, phone: string, countryPhone: string;
	let code: string;
	const handleSubmit: SubmitFunction = ({ cancel }) => {
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
			class="border rounded border-primary w-full"
			type="text"
			bind:value={code}
			maxlength="6"
			placeholder="code"
			name="code"
		/>
		<button
			disabled={verified}
			type="submit"
			class="p-2 rounded bg-primary text-background sm:hover:bg-primary-500 h-12"
		>
			{#if verified}
				<div class="flex items-center">
					<i class="fa fa-check text-background mr-2" />
					<span class=" text-background">Verified!</span>
				</div>
			{:else}
				Verify
			{/if}
		</button>
		<input type="text" name="phone" value={phone} class="hidden" />
		<input type="text" name="countryPhone" value={countryPhone} class="hidden" />
	</div>
</form>
