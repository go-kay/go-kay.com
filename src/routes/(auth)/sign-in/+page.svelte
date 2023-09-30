<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { SocialLoginButton } from '$lib/components';
	import { toast } from '$lib/components/toast/toast';
	import EmailLoginForm from '$lib/components/auth/EmailLoginForm.svelte';

	export let form: ActionData, data: PageData;

	let loading: string | undefined = undefined;

	$: {
		if (form?.error !== undefined) {
			toast({ description: form.error, type: 'error' });
		}
		if (form?.success === true) {
			toast({ description: form.message, duration: 10000 });
		}
	}
</script>

<div class="flex flex-col h-full justify-center items-center w-80 mx-auto">
	<h1 class="mb-12 text-primary">GoKay</h1>
	<EmailLoginForm bind:loading />
	<div class="flex justify-center my-8 items-center space-x-4 w-full">
		<div class="flex-1 border-b h-0 border-primary" />
		<small class=" text-primary">or</small>
		<div class="flex-1 border-b h-0 border-primary" />
	</div>
	<div class="flex flex-col space-y-2 w-full">
		<SocialLoginButton provider="facebook" bind:loading supabase={data.supabase} />
		<SocialLoginButton provider="google" bind:loading supabase={data.supabase} />
	</div>
</div>
