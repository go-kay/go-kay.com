<script lang="ts">
	import { countryCodeEmoji } from 'country-code-emoji';
	import type { User } from '$db/schema';

	export let user: User;
</script>

<div class="flex space-x-2 items-center">
	{#if user.avatarUrl}
		<img src={user.avatarUrl} alt="avatar" class="h-6 w-6 aspect-square rounded-full" />
	{:else}
		<i class="fa-solid fa-circle-user text-primary text-4xl" />
	{/if}
	<p class="text-primary">
		{user.firstName}
		{user.lastName}
	</p>

	<span class="text-xl">
		{countryCodeEmoji(user.countryCode)}
	</span>
</div>
