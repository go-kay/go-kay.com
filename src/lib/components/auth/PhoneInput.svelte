<script lang="ts">
	import CountryCodes from '$lib/assets/CountryCodes';
	import type { CountryCode } from '$lib/assets/CountryCodes';
	import type { KeyboardEventHandler } from 'svelte/elements';
	import { toast } from '$lib/components/toast/toast';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import PhoneVerification from '$lib/components/auth/PhoneVerification.svelte';

	export let country: CountryCode | string, phone: string, verified: boolean;
	let verificationCodeSent = false;
	const handleSubmit: SubmitFunction = async ({ cancel }) => {
		if (!phone) {
			toast({
				type: 'error',
				description: 'Please enter your phone number'
			});
			return cancel();
		}
		return async ({ update, result }) => {
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

	const handlePhoneInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (typeof country === 'string') {
			toast({
				description: 'Please select country first',
				type: 'error'
			});
			e.preventDefault();
			return;
		}
		verificationCodeSent = false;
	};
</script>

<div class="border rounded border-primary p-2 h-12">
	<input type="text" class="hidden" name="country" value={JSON.stringify(country)} />
	<select class="text-primary bg-background outline-none h-full text-sm" bind:value={country}>
		<option> Country </option>
		{#each CountryCodes as country}
			<option value={country}>
				{country.emoji}
				{country.name}
			</option>
		{/each}
	</select>
</div>

<div class="flex space-x-4">
	<div class="border rounded border-primary p-3 h-12 flex items-center space-x-2 w-full">
		{#if country && typeof country !== 'string'}
			<span class="whitespace-nowrap text-primary">
				{country.phone[0]}
			</span>
		{/if}
		<input
			type="number"
			name="phone"
			placeholder="phone"
			class="appearance-none p-0 w-full !h-10 border-none"
			bind:value={phone}
			on:keydown={handlePhoneInput}
		/>
	</div>
	{#if !verified}
		<form action="?/sendVerifySms" method="POST" use:enhance={handleSubmit}>
			<button
				type="submit"
				class="p-2 rounded bg-primary text-background sm:hover:bg-primary-500 h-12"
			>
				{#if verificationCodeSent}
					Resend
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
	{/if}
</div>

{#if verificationCodeSent}
	<PhoneVerification bind:verified />
{/if}
