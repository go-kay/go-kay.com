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
		isLoading = false;
	// verified = false;
	const handleSubmit: SubmitFunction = () => {
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
	<h2 class="mb-4">Welcome to <span class="text-4xl text-primary">Go Kay!</span></h2>
	<p class="mb-8 text-primary text-lg">Please let us know about yourself for the better service.</p>
	<form class="flex flex-col space-y-4" action="?/signUp" method="POST" use:enhance={handleSubmit}>
		<div class="flex space-x-4">
			<input
				type="text"
				placeholder="First name"
				class="border rounded border-primary bg-background text-primary h-12 px-4 py-2 placeholder-primary-300"
				name="firstName"
				id="firstName"
				bind:value={firstName}
			/>
			<input
				type="text"
				placeholder="Last name"
				class="border rounded border-primary bg-background text-primary h-12 px-4 py-2 placeholder-primary-300"
				name="lastName"
				bind:value={lastName}
			/>
		</div>
		<PhoneInput bind:country bind:phone />
		<BirthdayInput />
		<GenderInput bind:gender />
		<!--		<input class="hidden" type="checkbox" name="verified" value={verified} />-->
		<button
			type="submit"
			disabled={isLoading}
			class="text-background bg-primary rounded h-12 dark:sm:hover:bg-primary-500 sm:hover:bg-primary-500"
		>
			{#if isLoading}
				<Spinner />
			{:else}
				<span class="text-background">Done</span>
			{/if}
		</button>
	</form>
</div>
