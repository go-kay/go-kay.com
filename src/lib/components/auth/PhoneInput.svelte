<script lang="ts">
	import type { CountryCode } from '$lib/assets/CountryCodes';
	import type { KeyboardEventHandler } from 'svelte/elements';
	import { toast } from '$lib/components/toast/toast';
	// import PhoneVerification from '$lib/components/auth/PhoneVerification.svelte';
	import SelectCountry from '$lib/components/auth/SelectCountry.svelte';
	// import SendVerifyCodeButton from '$lib/components/auth/SendVerifyCodeButton.svelte';

	export let country: CountryCode | string, phone: string;
	// verified: boolean;
	// let verificationCodeSent = false;

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (typeof country === 'string') {
			toast({
				description: 'Please select country first',
				type: 'error'
			});
			e.preventDefault();
			return;
		}
		// verificationCodeSent = false;
	};
</script>

<SelectCountry bind:country />

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
			class="outline-none appearance-none p-0 w-full !h-10 border-none bg-background text-primary placeholder-primary-300"
			bind:value={phone}
			on:keydown={handleKeyDown}
		/>
	</div>
	<!--{#if !verified}-->
	<!--	<SendVerifyCodeButton bind:country bind:verificationCodeSent bind:phone />-->
	<!--{/if}-->
</div>

<!--{#if verificationCodeSent}-->
<!--	<PhoneVerification-->
<!--		bind:verified-->
<!--		{phone}-->
<!--		countryPhone={typeof country !== 'string' ? country.phone[0] : ''}-->
<!--	/>-->
<!--{/if}-->
