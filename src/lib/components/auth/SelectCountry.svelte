<script lang="ts">
	import CountryCodes from '$lib/assets/CountryCodes';
	import type { CountryCode } from '$lib/assets/CountryCodes';

	export let country: CountryCode | string;
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
