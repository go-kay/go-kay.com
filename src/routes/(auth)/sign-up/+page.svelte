<script lang="ts">
	import PhoneInput from '$lib/components/auth/PhoneInput.svelte';
	import BirthdayInput from '$lib/components/auth/BirthdayInput.svelte';
	import GenderInput from '$lib/components/auth/GenderInput.svelte';
	import { enhance } from '$app/forms';
	import type { CountryCode } from '$lib/assets/CountryCodes';
	import { toast } from '$lib/components/toast/toast';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Spinner from '$lib/components/spinner/Spinner.svelte';

	let firstName: string,
		lastName: string,
		country: CountryCode,
		phone: string,
		gender: string,
		isLoading = false,
		verified = false;
	const handleSubmit: SubmitFunction = ({ cancel }) => {
		if (!firstName) {
			toast({
				type: 'error',
				description: 'Please enter your first name.'
			});
			return cancel();
		} else if (!lastName) {
			toast({
				type: 'error',
				description: 'Please enter your last name.'
			});
			return cancel();
		} else if (!country) {
			toast({
				type: 'error',
				description: 'Please select your country.'
			});
			return cancel();
		} else if (!phone) {
			toast({
				type: 'error',
				description: 'Please enter your phone number.'
			});
			return cancel();
		} else if (!verified) {
			toast({
				type: 'error',
				description: 'Please verify your phone number.'
			});
			return cancel();
		} else if (!gender) {
			toast({
				type: 'error',
				description: 'Please select your gender.'
			});
			return cancel();
		}
		isLoading = true;

		return async ({ update, result }) => {
			if (result.type === 'failure') {
				toast({
					type: 'error',
					description: result.data!.message
				});
			}
			isLoading = false;
			await update({ reset: false });
		};
	};
</script>

<div class="flex flex-col h-full justify-center items-center">
	<h3 class="mb-2">Welcome to <span class="text-4xl text-primary">Go Kay!</span></h3>
	<p class="mb-12 text-primary">Please let us know about yourself for the better service.</p>
	<form class="flex flex-col space-y-4" action="?/signUp" method="POST" use:enhance={handleSubmit}>
		<div class="flex space-x-4">
			<input
				type="text"
				placeholder="First name"
				class="border"
				name="firstName"
				id="firstName"
				bind:value={firstName}
			/>
			<input
				type="text"
				placeholder="Last name"
				class="border"
				name="lastName"
				bind:value={lastName}
			/>
		</div>
		<PhoneInput bind:country bind:phone bind:verified />
		<BirthdayInput />
		<GenderInput bind:gender />
		<button
			type="submit"
			disabled={isLoading}
			class="text-background bg-primary rounded h-12 dark:sm:hover:bg-primary-500 sm:hover:bg-primary-500"
		>
			{#if isLoading}
				<Spinner classes="w-6 h-6 border-background mx-auto" />
			{:else}
				<span class="text-background">Done</span>
			{/if}
		</button>
	</form>
</div>
