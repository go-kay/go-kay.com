<script lang="ts">
	import { page } from '$app/stores';
	import { toast } from '$lib/components/toast/toast';

	$: {
		const signInSuccess = $page.url.searchParams.get('success');
		if (signInSuccess) {
			toast({
				title: 'Successfully signed in!',
				description: 'Welcome to Go Kay!',
				duration: 5000
			});
		}
	}
</script>

<div>hi</div>
<i class="fas fa-address-book" />

<div class="h-[200vh]">Hello</div>
